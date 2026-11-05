"""Record a live web prototype and turn it into a framed motion mockup.

Two subcommands, run with `python3 -I mockup.py <command> ...`:

  record   Open a URL or local file in headless Chrome at one viewport, run the
           steps from a JSON file (wait, scroll, click, type, hover) and save
           every frame with its real timing.
  compose  Put one or two recordings into device frames (phone, browser window)
           on a flat background, and write MP4, WebM, GIF and a still poster.

Standard library only. Needs Google Chrome and ffmpeg.
"""
import argparse
import base64
import http.client
import json
import os
import select
import shutil
import socket
import struct
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.parse import urlparse

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FFMPEG = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"


# Chrome DevTools Protocol over a minimal WebSocket client

class CDP:
    def __init__(self, ws_url):
        u = urlparse(ws_url)
        self.sock = socket.create_connection((u.hostname, u.port))
        key = base64.b64encode(os.urandom(16)).decode()
        self.sock.sendall(
            f"GET {u.path} HTTP/1.1\r\nHost: {u.hostname}:{u.port}\r\n"
            "Upgrade: websocket\r\nConnection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n".encode()
        )
        self.buf = bytearray()
        while b"\r\n\r\n" not in self.buf:
            self.buf += self.sock.recv(4096)
        end = self.buf.index(b"\r\n\r\n") + 4
        if b" 101 " not in bytes(self.buf[:end]).split(b"\r\n")[0]:
            raise RuntimeError("WebSocket handshake failed")
        del self.buf[:end]
        self.next_id = 0
        self.on_event = None

    def _read(self, n):
        while len(self.buf) < n:
            chunk = self.sock.recv(1 << 20)
            if not chunk:
                raise ConnectionError("Chrome closed the connection")
            self.buf += chunk
        out = bytes(self.buf[:n])
        del self.buf[:n]
        return out

    def _send_frame(self, opcode, payload):
        mask = os.urandom(4)
        n = len(payload)
        if n < 126:
            head = struct.pack("!BB", 0x80 | opcode, 0x80 | n)
        elif n < 1 << 16:
            head = struct.pack("!BBH", 0x80 | opcode, 0x80 | 126, n)
        else:
            head = struct.pack("!BBQ", 0x80 | opcode, 0x80 | 127, n)
        body = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(head + mask + body)

    def _message(self):
        data = b""
        while True:
            b1, b2 = self._read(2)
            opcode, n = b1 & 0x0F, b2 & 0x7F
            if n == 126:
                n = struct.unpack("!H", self._read(2))[0]
            elif n == 127:
                n = struct.unpack("!Q", self._read(8))[0]
            payload = self._read(n)
            if opcode == 9:
                self._send_frame(10, payload)
                continue
            if opcode == 8:
                raise ConnectionError("Chrome closed the connection")
            data += payload
            if b1 & 0x80:
                return json.loads(data)

    def call(self, method, **params):
        my_id = self.send(method, **params)
        while True:
            msg = self._message()
            if msg.get("id") == my_id:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error'].get('message')}")
                return msg.get("result", {})
            self._dispatch(msg)

    def send(self, method, **params):
        """Send without waiting for the answer."""
        self.next_id += 1
        self._send_frame(1, json.dumps({"id": self.next_id, "method": method, "params": params}).encode())
        return self.next_id

    def _dispatch(self, msg):
        if "method" in msg and self.on_event:
            self.on_event(msg)

    def pump(self, seconds):
        """Handle incoming events for a while (screencast frames)."""
        end = time.monotonic() + seconds
        while (left := end - time.monotonic()) > 0:
            if self.buf or select.select([self.sock], [], [], left)[0]:
                self._dispatch(self._message())

    def js(self, expression):
        r = self.call("Runtime.evaluate", expression=expression, returnByValue=True, awaitPromise=True)
        if "exceptionDetails" in r:
            raise RuntimeError(f"Script error: {r['exceptionDetails'].get('text')} in {expression[:80]}")
        return r.get("result", {}).get("value")


class Browser:
    def __init__(self, scale=1):
        # The screencast only follows the device pixel ratio when Chrome itself starts at that scale
        self.scale = scale

    def __enter__(self):
        self.profile = tempfile.mkdtemp(prefix="mockup-chrome-")
        self.proc = subprocess.Popen(
            [CHROME, "--headless=new", "--remote-debugging-port=0", f"--user-data-dir={self.profile}",
             "--hide-scrollbars", "--mute-audio", "--no-first-run", "--no-default-browser-check",
             "--allow-file-access-from-files", f"--force-device-scale-factor={self.scale}", "about:blank"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        port_file = Path(self.profile) / "DevToolsActivePort"
        for _ in range(100):
            if port_file.exists() and port_file.read_text().strip():
                break
            time.sleep(0.1)
        port = int(port_file.read_text().split()[0])
        conn = http.client.HTTPConnection("127.0.0.1", port)
        conn.request("GET", "/json/list")
        page = next(t for t in json.loads(conn.getresponse().read()) if t["type"] == "page")
        self.cdp = CDP(page["webSocketDebuggerUrl"])
        return self.cdp

    def __exit__(self, *exc):
        self.proc.terminate()
        try:
            self.proc.wait(5)
        except subprocess.TimeoutExpired:
            self.proc.kill()
        shutil.rmtree(self.profile, ignore_errors=True)


def to_url(target):
    if "://" in target:
        return target
    path, _, fragment = target.partition("#")
    return Path(path).resolve().as_uri() + (f"#{fragment}" if fragment else "")


# record

def center_of(cdp, selector=None, text=None):
    if text is not None:
        find = (
            "[...document.querySelectorAll('a,button,input,label,[role=button],summary,li,span,div')]"
            f".filter(e => e.offsetParent !== null && e.textContent.trim() === {json.dumps(text)})"
            ".sort((a, b) => a.textContent.length - b.textContent.length)[0]"
        )
    else:
        find = f"document.querySelector({json.dumps(selector)})"
    rect = cdp.js(
        f"(() => {{ const e = {find}; if (!e) return null; e.scrollIntoView({{block: 'nearest'}});"
        " const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; })()"
    )
    if rect is None:
        raise SystemExit(f"Not found on the page: {text if text is not None else selector}")
    return rect


def record(args):
    out = Path(args.out)
    if out.exists():
        shutil.rmtree(out)
    (out / "frames").mkdir(parents=True)
    steps = json.loads(Path(args.steps).read_text()) if args.steps else []
    frames = []

    with Browser(args.dpr) as cdp:
        cdp.call("Page.enable")
        cdp.call("Emulation.setDeviceMetricsOverride", width=args.width, height=args.height,
                 deviceScaleFactor=args.dpr, mobile=args.mobile)
        if args.mobile:
            cdp.call("Emulation.setTouchEmulationEnabled", enabled=True, maxTouchPoints=1)
        cdp.call("Page.navigate", url=to_url(args.url))
        time.sleep(args.settle / 1000)

        crop = None
        if args.clip:
            r = cdp.js(
                f"(() => {{ const e = document.querySelector({json.dumps(args.clip)}); if (!e) return null;"
                " e.scrollIntoView({block: 'nearest'}); const r = e.getBoundingClientRect();"
                " return [r.x, r.y, r.width, r.height]; })()"
            )
            if r is None:
                raise SystemExit(f"Clip element not found: {args.clip}")
            crop = [round(v * args.dpr) for v in r]

        def on_event(msg):
            if msg["method"] != "Page.screencastFrame":
                return
            frame = msg["params"]
            cdp.send("Page.screencastFrameAck", sessionId=frame["sessionId"])
            name = f"{len(frames) + 1:05d}.jpg"
            (out / "frames" / name).write_bytes(base64.b64decode(frame["data"]))
            frames.append((name, frame["metadata"].get("timestamp") or time.time()))

        cdp.on_event = on_event
        cdp.call("Page.startScreencast", format="jpeg", quality=95, everyNthFrame=1,
                 maxWidth=round(args.width * args.dpr), maxHeight=round(args.height * args.dpr))

        def capture(ms):
            cdp.pump(ms / 1000)

        capture(args.lead)
        for step in steps:
            hold = step.get("hold", 600)
            if "wait" in step:
                capture(step["wait"])
                continue
            if "scroll" in step or "scrollTo" in step:
                within = json.dumps(step.get("in"))
                duration = step.get("duration", 1200)
                target = (f"(r => r.top + r.height / 2 - innerHeight / 2)(document.querySelector({json.dumps(step['scrollTo'])}).getBoundingClientRect())"
                          if "scrollTo" in step else str(step["scroll"]))
                cdp.js(
                    f"(() => {{ const box = {within} ? document.querySelector({within}) : document.scrollingElement;"
                    f" const from = box.scrollTop, by = {target}, d = {duration}, t0 = performance.now();"
                    " const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;"
                    " const tick = now => { const t = Math.min(1, (now - t0) / d); box.scrollTop = from + by * ease(t);"
                    " if (t < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); })()"
                )
                capture(duration + hold)
                continue
            if "click" in step or "clickText" in step or "hover" in step:
                x, y = center_of(cdp, step.get("click") or step.get("hover"), step.get("clickText"))
                cdp.call("Input.dispatchMouseEvent", type="mouseMoved", x=x, y=y)
                if "hover" not in step:
                    capture(step.get("before", 250))
                    cdp.call("Input.dispatchMouseEvent", type="mousePressed", x=x, y=y, button="left", clickCount=1)
                    cdp.call("Input.dispatchMouseEvent", type="mouseReleased", x=x, y=y, button="left", clickCount=1)
                capture(hold)
                continue
            if "type" in step:
                selector, text = step["type"]
                cdp.js(f"document.querySelector({json.dumps(selector)}).focus()")
                for ch in text:
                    cdp.call("Input.insertText", text=ch)
                    capture(step.get("delay", 70))
                capture(hold)
                continue
            raise SystemExit(f"Unknown step: {step}")
        stop = time.time()
        cdp.call("Page.stopScreencast")

    if not frames:
        raise SystemExit("No frames came in. Is the page blank?")
    lines = []
    for (name, t), nxt in zip(frames, frames[1:] + [None]):
        duration = max((nxt[1] if nxt else stop) - t, 1 / 60)
        lines += [f"file 'frames/{name}'", f"duration {duration:.4f}"]
    lines.append(f"file 'frames/{frames[-1][0]}'")
    (out / "concat.txt").write_text("\n".join(lines) + "\n")
    size = crop[2:] if crop else [round(args.width * args.dpr), round(args.height * args.dpr)]
    (out / "meta.json").write_text(json.dumps({"size": size, "crop": crop, "url": args.url}))
    total = stop - frames[0][1]
    print(f"recorded {len(frames)} frames over {total:.1f}s ({len(frames) / max(total, .01):.0f} fps) in {out}")


# compose

def frame_size(rec):
    return json.loads((Path(rec) / "meta.json").read_text())["size"]


def layout(W, H, desktop, phone, desktop_shift=0):
    """Proposed default positions. The skill shows a preview and asks before the final render."""
    boxes = {}
    if desktop:
        dw, dh = desktop
        bar = round(W * 0.035)
        w = round(W * (0.80 if phone else 0.86))
        h = round(w * dh / dw)
        x = round(W * (0.06 if phone else 0.07))
        y = round((H - h - bar) / 2 - (H * 0.04 if phone else 0)) + desktop_shift
        boxes["desktop"] = dict(x=x, y=y + bar, w=w, h=h, bar=bar, radius=round(W * 0.018))
    if phone:
        pw, ph = phone
        h = round(H * (0.64 if desktop else 0.80))
        w = round(h * pw / ph)
        bezel = round(w * 0.035)
        x = round(W * 0.92 - w) if desktop else round((W - w) / 2)
        y = round(H * 0.94 - h) if desktop else round((H - h) / 2)
        boxes["phone"] = dict(x=x, y=y, w=w, h=h, bezel=bezel, radius=round(w * 0.09))
    return boxes


def frame_overlay_html(W, H, boxes, frame_color, chrome_color):
    parts = []
    if "desktop" in boxes:
        d = boxes["desktop"]
        b = max(2, round(d["radius"] * 0.5))
        parts.append(
            f'<div style="position:absolute;left:{d["x"] - b}px;top:{d["y"] - d["bar"]}px;width:{d["w"] + 2 * b}px;'
            f'height:{d["h"] + d["bar"] + b}px;border-radius:{d["radius"] + b}px;'
            f'border:solid {chrome_color};border-width:{d["bar"]}px {b + 1}px {b + 1}px;box-sizing:border-box"></div>'
        )
    for key in [k for k in boxes if k.startswith("phone")]:
        p = boxes[key]
        t = max(p["bezel"], round(p["radius"] * 0.5))
        parts.append(
            f'<div style="position:absolute;left:{p["x"] - t}px;top:{p["y"] - t}px;width:{p["w"] + 2 * t}px;'
            f'height:{p["h"] + 2 * t}px;border-radius:{p["radius"] + t}px;border:{t}px solid {frame_color};'
            'box-sizing:border-box"></div>'
        )
    return (f'<!doctype html><html><body style="margin:0;width:{W}px;height:{H}px;position:relative;'
            f'background:transparent">{"".join(parts)}</body></html>')


def render_png(html_text, W, H, path):
    src = Path(tempfile.mkdtemp(prefix="mockup-stage-")) / "stage.html"
    src.write_text(html_text)
    with Browser() as cdp:
        cdp.call("Emulation.setDeviceMetricsOverride", width=W, height=H, deviceScaleFactor=1, mobile=False)
        cdp.call("Emulation.setDefaultBackgroundColorOverride", color=dict(r=0, g=0, b=0, a=0))
        cdp.call("Page.navigate", url=src.as_uri())
        time.sleep(0.5)
        shot = cdp.call("Page.captureScreenshot", format="png")
    Path(path).write_bytes(base64.b64decode(shot["data"]))
    shutil.rmtree(src.parent, ignore_errors=True)


def recording_length(rec):
    return sum(float(l.split()[1]) for l in (Path(rec) / "concat.txt").read_text().splitlines()
               if l.startswith("duration"))


def row_layout(W, H, sizes):
    """Phones side by side, same height, evenly spaced, centered."""
    n = len(sizes)
    h = round(H * 0.78)
    ws = [round(h * pw / ph) for pw, ph in sizes]
    gap = (W - sum(ws)) / (n + 1)
    boxes, x = {}, gap
    for i, w in enumerate(ws):
        boxes[f"phone{i}"] = dict(x=round(x), y=round((H - h) / 2), w=w, h=h,
                                  bezel=round(w * 0.035), radius=round(w * 0.09))
        x += w + gap
    return boxes


def compose(args):
    W, H = (int(v) for v in args.size.split("x"))
    if args.row:
        recs = {f"phone{i}": r for i, r in enumerate(args.row.split(","))}
        boxes = row_layout(W, H, [frame_size(r) for r in recs.values()])
    else:
        recs = {k: v for k, v in (("desktop", args.desktop), ("phone", args.phone)) if v}
        if not recs:
            raise SystemExit("Give --desktop, --phone, both, or --row.")
        boxes = layout(W, H, *(frame_size(recs[k]) if k in recs else None for k in ("desktop", "phone")),
                       desktop_shift=args.desktop_shift)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    work = Path(tempfile.mkdtemp(prefix="mockup-compose-"))

    overlays = {}
    for kind in boxes:
        overlays[kind] = work / f"{kind}-frame.png"
        render_png(frame_overlay_html(W, H, {kind: boxes[kind]}, args.frame_color, args.chrome_color),
                   W, H, overlays[kind])

    length = max(recording_length(r) for r in recs.values())
    inputs = ["-f", "lavfi", "-i", f"color=c={args.bg}:s={W}x{H}:r={args.fps}:d={length:.3f}"]
    chain, last, n = [], "0:v", 1
    for kind in recs:
        b = boxes[kind]
        inputs += ["-f", "concat", "-safe", "0", "-i", str(Path(recs[kind]) / "concat.txt"), "-i", str(overlays[kind])]
        crop = json.loads((Path(recs[kind]) / "meta.json").read_text()).get("crop")
        cut = f"crop={crop[2]}:{crop[3]}:{crop[0]}:{crop[1]}," if crop else ""
        chain.append(
            f"[{n}:v]{cut}fps={args.fps},scale={b['w']}:{b['h']}:flags=lanczos,setsar=1,"
            f"tpad=stop_mode=clone:stop_duration={length:.3f}[{kind}v]"
        )
        chain.append(f"[{last}][{kind}v]overlay={b['x']}:{b['y']}:shortest=1[{kind}a]")
        chain.append(f"[{kind}a][{n + 1}:v]overlay=0:0[{kind}b]")
        last, n = f"{kind}b", n + 2
    chain.append(f"[{last}]trim=duration={length:.3f},format=yuv420p[out]")
    master = work / "master.mp4"
    run([FFMPEG, "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(chain), "-map", "[out]",
         "-c:v", "libx264", "-crf", "12", "-preset", "slow", "-an", str(master)])

    stem = str(out)
    poster = f"{stem}-poster.png"
    run([FFMPEG, "-y", "-loglevel", "error", "-ss", f"{args.poster_at:.2f}", "-i", str(master),
         "-frames:v", "1", poster])
    if args.preview:
        print(f"preview: {poster}")
        shutil.rmtree(work, ignore_errors=True)
        return
    run([FFMPEG, "-y", "-loglevel", "error", "-i", str(master), "-c:v", "libx264", "-crf", "22",
         "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", f"{stem}.mp4"])
    run([FFMPEG, "-y", "-loglevel", "error", "-i", str(master), "-c:v", "libvpx-vp9", "-crf", "36",
         "-b:v", "0", "-row-mt", "1", "-an", f"{stem}.webm"])
    gw = args.gif_width
    run([FFMPEG, "-y", "-loglevel", "error", "-i", str(master), "-filter_complex",
         f"fps={args.gif_fps},scale={gw}:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];"
         "[b][p]paletteuse=dither=sierra2_4a", f"{stem}.gif"])
    shutil.rmtree(work, ignore_errors=True)
    for ext in ("mp4", "webm", "gif"):
        size = os.path.getsize(f"{stem}.{ext}") / 1e6
        print(f"{stem}.{ext}  {size:.1f} MB")
    print(f"{poster}  (still frame for reduced motion and before playing)")


def run(cmd):
    r = subprocess.run(cmd)
    if r.returncode:
        raise SystemExit(f"ffmpeg failed: {' '.join(cmd[:6])} ...")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="command", required=True)

    r = sub.add_parser("record", help="record a prototype at one viewport")
    r.add_argument("--url", required=True, help="link or local HTML file")
    r.add_argument("--out", required=True, help="folder for the frames")
    r.add_argument("--steps", help="JSON file with the steps to run")
    r.add_argument("--width", type=int, default=390)
    r.add_argument("--height", type=int, default=844)
    r.add_argument("--dpr", type=float, default=2)
    r.add_argument("--mobile", action="store_true", help="emulate a phone (touch, mobile viewport)")
    r.add_argument("--clip", help="CSS selector of one element to record (e.g. an artboard on a canvas)")
    r.add_argument("--settle", type=int, default=2500, help="ms to wait after the page opens")
    r.add_argument("--lead", type=int, default=700, help="ms of stillness before the first step")

    c = sub.add_parser("compose", help="frame the recordings and write the files")
    c.add_argument("--desktop", help="folder from a desktop recording")
    c.add_argument("--phone", help="folder from a phone recording")
    c.add_argument("--out", required=True, help="output path without extension")
    c.add_argument("--size", default="1248x1248", help="1248x1248 for a square card, 2544x1248 for a wide one")
    c.add_argument("--bg", default="#F7F7F4")
    c.add_argument("--frame-color", default="#0E0E0E", help="phone frame color")
    c.add_argument("--chrome-color", default="#FFFFFF", help="browser window color")
    c.add_argument("--fps", type=int, default=60)
    c.add_argument("--gif-fps", type=int, default=15)
    c.add_argument("--gif-width", type=int, default=624)
    c.add_argument("--poster-at", type=float, default=0, help="second of the still frame")
    c.add_argument("--row", help="phone recordings side by side, comma-separated folders (a still is a one-frame recording)")
    c.add_argument("--desktop-shift", type=int, default=0, help="move the desktop window by this many pixels (negative is up)")
    c.add_argument("--preview", action="store_true", help="only write the still frame, to check the layout")

    args = p.parse_args()
    {"record": record, "compose": compose}[args.command](args)


if __name__ == "__main__":
    sys.exit(main())
