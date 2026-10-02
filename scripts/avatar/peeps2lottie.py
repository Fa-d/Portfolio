"""Convert the Open Peeps avatar (DiceBear SVG) into an animated Lottie.

Parts (from the SVG's own groups): body, head, face, facial hair, accessories (glasses).
Animation, 6s @30fps:
  - breathing: body scales slightly from the bottom edge; head lifts with it
  - head tilt: ~2 degrees around the neck
  - blink: the face swaps to the eyes-closed variant for 4 frames, twice per loop
  - glint: a light streak sweeps across the glasses
"""
import json
import math
import re
import sys

SRC = 704
W = H = 512
S = W / SRC
FPS, END = 30, 180
CX, CY, R = 256, 256, 256

NUM = r"[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?"


# ---------------------------------------------------------------- SVG path parsing
def tokenize(d):
    for cmd, args in re.findall(r"([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)", d):
        if cmd in "Aa":
            # arc flags can be written without separators ("0 011 2")
            nums, s = [], args.strip()
            i = 0
            while s:
                s = s.lstrip(" ,")
                if not s:
                    break
                if i % 7 in (3, 4):
                    nums.append(float(s[0])); s = s[1:]
                else:
                    m = re.match(NUM, s); nums.append(float(m.group(0))); s = s[m.end():]
                i += 1
        else:
            nums = [float(x) for x in re.findall(NUM, args)]
        yield cmd, nums


def arc_to_cubics(x1, y1, rx, ry, phi, fa, fs, x2, y2):
    """SVG arc -> list of cubic segments (c1, c2, end)."""
    if rx == 0 or ry == 0:
        return [((x1, y1), (x2, y2), (x2, y2))]
    phi = math.radians(phi)
    cp, sp = math.cos(phi), math.sin(phi)
    dx, dy = (x1 - x2) / 2, (y1 - y2) / 2
    x1p, y1p = cp * dx + sp * dy, -sp * dx + cp * dy
    rx, ry = abs(rx), abs(ry)
    lam = x1p ** 2 / rx ** 2 + y1p ** 2 / ry ** 2
    if lam > 1:
        rx *= math.sqrt(lam); ry *= math.sqrt(lam)
    num = rx ** 2 * ry ** 2 - rx ** 2 * y1p ** 2 - ry ** 2 * x1p ** 2
    den = rx ** 2 * y1p ** 2 + ry ** 2 * x1p ** 2
    co = math.sqrt(max(0, num / den)) * (-1 if fa == fs else 1)
    cxp, cyp = co * rx * y1p / ry, -co * ry * x1p / rx
    cx = cp * cxp - sp * cyp + (x1 + x2) / 2
    cy = sp * cxp + cp * cyp + (y1 + y2) / 2

    def ang(ux, uy, vx, vy):
        a = math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)
        return a

    t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
    dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry)
    if not fs and dt > 0:
        dt -= 2 * math.pi
    elif fs and dt < 0:
        dt += 2 * math.pi
    n = max(1, int(math.ceil(abs(dt) / (math.pi / 2) - 1e-9)))
    seg = dt / n
    k = 4 / 3 * math.tan(seg / 4)
    out = []

    def pt(t):
        x, y = rx * math.cos(t), ry * math.sin(t)
        return cp * x - sp * y + cx, sp * x + cp * y + cy

    def dpt(t):
        x, y = -rx * math.sin(t), ry * math.cos(t)
        return cp * x - sp * y, sp * x + cp * y

    for i in range(n):
        a0, a1 = t1 + i * seg, t1 + (i + 1) * seg
        p0, p1 = pt(a0), pt(a1)
        d0, d1 = dpt(a0), dpt(a1)
        out.append(((p0[0] + k * d0[0], p0[1] + k * d0[1]), (p1[0] - k * d1[0], p1[1] - k * d1[1]), p1))
    return out


def parse(d, tx=0.0, ty=0.0, sx=1.0):
    """Return list of subpaths, each a list of (anchor, in_tangent, out_tangent) + closed flag."""
    subs, cur = [], None
    x = y = sx0 = sy0 = 0.0
    last_c2 = None
    last_cmd = ""

    def start(px, py):
        nonlocal cur
        cur = {"pts": [[(px, py), (0, 0), (0, 0)]], "closed": False}
        subs.append(cur)

    def cubic(c1, c2, p):
        a = cur["pts"][-1]
        cur["pts"][-1] = [a[0], a[1], (c1[0] - a[0][0], c1[1] - a[0][1])]
        cur["pts"].append([p, (c2[0] - p[0], c2[1] - p[1]), (0, 0)])

    def line(p):
        cur["pts"].append([p, (0, 0), (0, 0)])

    for cmd, n in tokenize(d):
        rel = cmd.islower()
        C = cmd.upper()
        if C == "Z":
            cur["closed"] = True
            x, y = sx0, sy0
            last_c2 = None
            last_cmd = C
            continue
        step = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6, "S": 4, "Q": 4, "T": 2, "A": 7}[C]
        for i in range(0, len(n), step):
            a = n[i:i + step]
            ox, oy = (x, y) if rel else (0, 0)
            if C == "M":
                x, y = a[0] + ox, a[1] + oy
                if i == 0:
                    start(x, y); sx0, sy0 = x, y
                else:
                    line((x, y))
                last_c2 = None
            elif C == "L":
                x, y = a[0] + ox, a[1] + oy; line((x, y)); last_c2 = None
            elif C == "H":
                x = a[0] + (x if rel else 0); line((x, y)); last_c2 = None
            elif C == "V":
                y = a[0] + (y if rel else 0); line((x, y)); last_c2 = None
            elif C == "C":
                c1 = (a[0] + ox, a[1] + oy); c2 = (a[2] + ox, a[3] + oy); p = (a[4] + ox, a[5] + oy)
                cubic(c1, c2, p); x, y = p; last_c2 = c2
            elif C == "S":
                c1 = (2 * x - last_c2[0], 2 * y - last_c2[1]) if last_c2 and last_cmd in "CS" else (x, y)
                c2 = (a[0] + ox, a[1] + oy); p = (a[2] + ox, a[3] + oy)
                cubic(c1, c2, p); x, y = p; last_c2 = c2
            elif C == "Q":
                q = (a[0] + ox, a[1] + oy); p = (a[2] + ox, a[3] + oy)
                c1 = (x + 2 / 3 * (q[0] - x), y + 2 / 3 * (q[1] - y)); c2 = (p[0] + 2 / 3 * (q[0] - p[0]), p[1] + 2 / 3 * (q[1] - p[1]))
                cubic(c1, c2, p); x, y = p; last_c2 = None
            elif C == "A":
                p = (a[5] + ox, a[6] + oy)
                for c1, c2, e in arc_to_cubics(x, y, a[0], a[1], a[2], int(a[3]), int(a[4]), p[0], p[1]):
                    cubic(c1, c2, e)
                x, y = p; last_c2 = None
            last_cmd = C
    # close: merge duplicate end point into start
    for sp_ in subs:
        pts = sp_["pts"]
        if sp_["closed"] and len(pts) > 1 and abs(pts[-1][0][0] - pts[0][0][0]) < 1e-3 and abs(pts[-1][0][1] - pts[0][0][1]) < 1e-3:
            pts[0][1] = pts[-1][1]
            pts.pop()

    def T(p):
        return [round((p[0] * sx + tx) * S, 2), round((p[1] + ty) * S, 2)]

    def V(v):
        return [round(v[0] * sx * S, 2), round(v[1] * S, 2)]

    shapes = []
    for sp_ in subs:
        if len(sp_["pts"]) < 2:
            continue
        shapes.append({"ty": "sh", "ks": {"a": 0, "k": {
            "v": [T(p[0]) for p in sp_["pts"]],
            "i": [V(p[1]) for p in sp_["pts"]],
            "o": [V(p[2]) for p in sp_["pts"]],
            "c": sp_["closed"]}}})
    return shapes


# ---------------------------------------------------------------- Lottie helpers
def static(v):
    return {"a": 0, "k": v}


def anim(keys, n, hold=False):
    out = []
    for t, v in keys:
        vv = v if isinstance(v, list) else [v]
        k = {"t": t, "s": vv}
        if hold:
            k["h"] = 1
        else:
            k.update({"i": {"x": [0.45] * n, "y": [1] * n}, "o": {"x": [0.55] * n, "y": [0] * n}})
        out.append(k)
    return {"a": 1, "k": out}


def tr(p=None, a=(0, 0), s=None, r=None, o=None):
    return {"ty": "tr", "p": p or static([0, 0]), "a": static(list(a)), "s": s or static([100, 100]),
            "r": r or static(0), "o": o or static(100), "sk": static(0), "sa": static(0)}


def color(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return [round(int(h[i:i + 2], 16) / 255, 4) for i in (0, 2, 4)] + [1]


def svg_groups(svg):
    """Top-level part groups of a DiceBear Open Peeps SVG -> list of (transform, [(d, fill)])."""
    import xml.etree.ElementTree as ET
    ns = "{http://www.w3.org/2000/svg}"
    root = ET.fromstring(svg)
    container = next(g for g in root.iter(ns + "g") if g.get("mask"))
    parts = []
    for child in container:
        if child.tag != ns + "g":
            continue
        paths = [(p.get("d"), p.get("fill")) for p in child.iter(ns + "path") if p.get("d") and p.get("fill")]
        parts.append((child.get("transform"), paths))
    return parts


def part_shapes(transform, paths):
    tx = ty = 0.0
    sx = 1.0
    if transform:
        nums = [float(v) for v in re.findall(NUM, transform)]
        if transform.startswith("translate"):
            tx, ty = nums[0], nums[1] if len(nums) > 1 else 0
        elif transform.startswith("matrix"):
            sx, tx, ty = nums[0], nums[4], nums[5]
    groups = []
    for d, fill in paths:
        shapes = parse(d, tx, ty, sx)
        # SVG paints the first path at the bottom; Lottie draws the first item on top.
        groups.insert(0, {"ty": "gr", "it": shapes + [{"ty": "fl", "c": static(color(fill)), "o": static(100), "r": 2}, tr()]})
    return groups


def bbox(groups):
    xs, ys = [], []
    for g in groups:
        for it in g["it"]:
            if it["ty"] == "sh":
                for v in it["ks"]["k"]["v"]:
                    xs.append(v[0]); ys.append(v[1])
    return min(xs), min(ys), max(xs), max(ys)


def build(open_svg, closed_svg):
    po = svg_groups(open(open_svg).read())
    pc = svg_groups(open(closed_svg).read())
    # order in the SVG: body, head, face, facialHair, mask, accessories
    body = part_shapes(*po[0])
    head = part_shapes(*po[1])
    face_open = part_shapes(*po[2])
    face_closed = part_shapes(*pc[2])
    beard = part_shapes(*po[3])
    glasses = part_shapes(*po[5])

    # Blink: open face visible except during two short windows where the closed face shows.
    blinks = [(58, 63), (136, 141)]
    o_keys, c_keys = [(0, 100)], [(0, 0)]
    for s0, s1 in blinks:
        o_keys += [(s0, 0), (s1, 100)]
        c_keys += [(s0, 100), (s1, 0)]
    def pick(groups, keep):
        """Rebuild groups keeping only subpaths whose bbox passes `keep(x0, y0, x1, y1)`."""
        out = []
        for g in groups:
            shapes = [it for it in g["it"] if it["ty"] == "sh"]
            rest = [it for it in g["it"] if it["ty"] != "sh"]
            kept = []
            for sh in shapes:
                v = sh["ks"]["k"]["v"]
                xs, ys = [a[0] for a in v], [a[1] for a in v]
                if keep(min(xs), min(ys), max(xs), max(ys)):
                    kept.append(sh)
            if kept:
                out.append({"ty": "gr", "it": kept + rest})
        return out

    # Eyes sit in a band between the brows and the nose; only they swap during a blink.
    is_eye = lambda x0, y0, x1, y1: y0 >= 246 and y1 <= 282 and (x1 - x0) < 40
    face = [
        {"ty": "gr", "nm": "eyes-open", "it": pick(face_open, is_eye) + [tr(o=anim(o_keys, 1, hold=True))]},
        {"ty": "gr", "nm": "eyes-closed", "it": pick(face_closed, is_eye) + [tr(o=anim(c_keys, 1, hold=True))]},
        {"ty": "gr", "nm": "face", "it": pick(face_open, lambda *b: not is_eye(*b)) + [tr()]},
    ]

    # Glint across each lens of the glasses.
    gx0, gy0, gx1, gy1 = bbox(glasses)
    lens_w = (gx1 - gx0) / 2
    glints = []
    for i in range(2):
        lx0 = gx0 + i * lens_w + lens_w * 0.2
        lx1 = gx0 + (i + 1) * lens_w - lens_w * 0.2
        cy = (gy0 + gy1) / 2
        pos = anim([(0, [lx0, cy]), (84, [lx0, cy]), (104, [lx1, cy]), (180, [lx1, cy])], 2)
        opa = anim([(0, 0), (84, 0), (91, 75), (98, 75), (104, 0), (180, 0)], 1)
        glints.append({"ty": "gr", "nm": "glint", "it": [
            {"ty": "rc", "p": static([0, 0]), "s": static([4, (gy1 - gy0) * 0.55]), "r": static(2), "d": 1},
            {"ty": "fl", "c": static([1, 1, 1, 1]), "o": static(100), "r": 1},
            tr(p=pos, r=static(25), o=opa)]})

    breath = [(0, 0), (45, 1), (90, 0), (135, 1), (180, 0)]
    neck = [350 * S, 560 * S]
    head_pos = anim([(t, [neck[0], neck[1] - 1.6 * v]) for t, v in breath], 2)
    head_rot = anim([(0, 0), (50, 2), (95, 0), (140, -1.6), (180, 0)], 1)
    body_scale = anim([(t, [100 + 0.6 * v, 100 + 1.4 * v]) for t, v in breath], 2)

    head_group = {"ty": "gr", "nm": "head", "it": glints + glasses + beard + face + head + [tr(p=head_pos, a=neck, r=head_rot)]}
    body_group = {"ty": "gr", "nm": "body", "it": body + [tr(p=static([256, 512]), a=(256, 512), s=body_scale)]}

    def circle(cx, cy, r):
        k = 0.5523 * r
        return {"i": [[-k, 0], [0, -k], [k, 0], [0, k]], "o": [[k, 0], [0, k], [-k, 0], [0, -k]],
                "v": [[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]], "c": True}

    grad = {"ty": "gf", "o": static(100), "r": 1, "t": 1,
            "g": {"p": 2, "k": static([0, 0.4, 0.494, 0.918, 1, 0.463, 0.294, 0.635])},
            "s": static([CX - R * 0.7, CY - R * 0.7]), "e": static([CX + R * 0.7, CY + R * 0.7])}
    background = [
        {"ty": "gr", "nm": "sheen", "it": [{"ty": "el", "p": static([CX - 60, CY - 70]), "s": static([320, 280]), "d": 1},
                                          {"ty": "fl", "c": static([1, 1, 1, 1]), "o": static(9), "r": 1}, tr()]},
        {"ty": "gr", "nm": "disc", "it": [{"ty": "el", "p": static([CX, CY]), "s": static([2 * R, 2 * R]), "d": 1}, grad, tr()]},
    ]

    def layer(ind, name, shapes, masks=None):
        lyr = {"ddd": 0, "ind": ind, "ty": 4, "nm": name, "sr": 1,
               "ks": {"o": static(100), "r": static(0), "p": static([0, 0, 0]), "a": static([0, 0, 0]), "s": static([100, 100, 100])},
               "ao": 0, "shapes": shapes, "ip": 0, "op": END, "st": 0, "bm": 0}
        if masks:
            lyr["hasMask"] = True
            lyr["masksProperties"] = masks
        return lyr

    mask = [{"inv": False, "mode": "a", "pt": static(circle(CX, CY, R)), "o": static(100), "x": static(0), "nm": "disc"}]
    return {"v": "5.7.4", "fr": FPS, "ip": 0, "op": END, "w": W, "h": H, "nm": "hero-avatar", "ddd": 0, "assets": [],
            "layers": [layer(1, "avatar", [{"ty": "gr", "nm": "figure", "it": [head_group, body_group, tr(p=static([262, 512]), a=(256, 512), s=static([90, 90]))]}], mask),
                       layer(2, "background", background)]}


if __name__ == "__main__":
    data = build(sys.argv[1], sys.argv[2])
    with open(sys.argv[3], "w") as f:
        json.dump(data, f, separators=(",", ":"))
    print("wrote", sys.argv[3])
