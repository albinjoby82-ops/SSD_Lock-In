#!/usr/bin/env python3
"""Builds data.js from content/*.txt. Run: python3 build.py

Content format (one file per chapter):
  @@part Title
  @@topic id | Title | source line
  @notes                 notes for the topic (markup below)
  @q Ch1 Q1              a tutorial question, then:
  @s Step title          one solution step (repeat)
  @a Final answer
Markup inside notes / steps (blank line between blocks):
  ## Heading             section heading
  $$ ... $$              big equation        $...$ inline maths
  > text                 tinted box (what an equation means / when to use it)
  ? question             check question, followed by a block starting "= answer"
  - item                 bullet list         | a | b |  table (first row = header)
  {{fig:name}}           drawn diagram       {{img:path|caption}}  image from img/
  **bold**
"""
import json, glob, re, html, os, math, hashlib
here = os.path.dirname(os.path.abspath(__file__))

# ------------------------------------------------------------------ drawing kit
def ln(x1, y1, x2, y2, c='k'): return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="{c}"/>'
def tx(x, y, s, c='', a='start'): return f'<text x="{x}" y="{y}" text-anchor="{a}" class="{c}">{s}</text>'
def sb(b, s): return f'{b}<tspan dy="4" font-size="10.5">{s}</tspan><tspan dy="-4" font-size="10.5">​</tspan>'
def pa(d, c='k'): return f'<path d="{d}" class="{c}"/>'
def rc(x, y, w, h, c='fg'): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="{c}"/>'
def el(x, y, r=4.5): return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" class="el"/>'
def ho(x, y, r=4.5): return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" class="ho"/>'
def head(x1, y1, x2, y2, h, s=7):
    a = math.atan2(y2 - y1, x2 - x1); bx, by = x2 - s * 1.5 * math.cos(a), y2 - s * 1.5 * math.sin(a)
    p1 = (bx - s * .55 * math.sin(a), by + s * .55 * math.cos(a)); p2 = (bx + s * .55 * math.sin(a), by - s * .55 * math.cos(a))
    return f'<polygon points="{x2:.1f},{y2:.1f} {p1[0]:.1f},{p1[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}" class="{h}"/>', bx, by
HC = {'k': 'hk', 'th': 'hk', 'bl': 'hb', 'rd': 'hr', 'kk': 'hk'}
def ar(x1, y1, x2, y2, c='k'):
    h, bx, by = head(x1, y1, x2, y2, HC[c]); return ln(x1, y1, bx, by, c) + h
def dar(x1, y1, x2, y2, c='th'):
    h2, bx, by = head(x1, y1, x2, y2, HC[c]); h1, ax, ay = head(x2, y2, x1, y1, HC[c]); return ln(ax, ay, bx, by, c) + h1 + h2
def svg(body, cap, w, h):
    return f'<figure class="fig"><svg viewBox="0 0 {w} {h}" width="{w}" role="img" aria-label="{html.escape(cap.replace("$", ""))}">{body}</svg><figcaption>{cap}</figcaption></figure>'

EC, EV, EF, EI, EVAC = sb('E', 'C'), sb('E', 'V'), sb('E', 'F'), sb('E', 'i'), sb('E', 'vac')

# ---- Topic 1: lattice
def lattice(ox, oy, title, centre=None, hole=False, free=None):
    s, o = 62, []
    o.append(tx(ox + s, oy - 34, title, 'tb', 'middle'))
    P = lambda i, j: (ox + i * s, oy + j * s)
    for i in range(3):
        for j in range(3):
            x, y = P(i, j)
            for dx, dy in ((1, 0), (0, 1)):
                if i + dx < 3 and j + dy < 3:
                    mx, my = x + dx * s / 2, y + dy * s / 2
                    o.append(ln(x + dx * 15, y + dy * 15, x + dx * (s - 15), y + dy * (s - 15), 'th'))
                    broken = hole and (i, j, dx, dy) == (1, 1, 1, 0)
                    o.append(el(mx - dx * 6, my - dy * 6, 3.6))
                    o.append(ho(mx + dx * 6, my + dy * 6, 4) if broken else el(mx + dx * 6, my + dy * 6, 3.6))
            for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):   # stubs: the lattice carries on
                if not (0 <= i + dx < 3 and 0 <= j + dy < 3):
                    o.append(ln(x + dx * 15, y + dy * 15, x + dx * 27, y + dy * 27, 'gd'))
    for i in range(3):
        for j in range(3):
            x, y = P(i, j); c = centre if (i, j) == (1, 1) and centre else None
            o.append(f'<circle cx="{x}" cy="{y}" r="15" class="{"atd" if c else "at"}"/>')
            o.append(tx(x, y + 5, c or 'Si', 'tb tw' if c else '', 'middle'))
    if hole: o.append(tx(ox + 1.5 * s, oy + s + 24, 'hole', 'trd sm', 'middle'))
    if free:
        fx, fy = ox + 1.5 * s, oy + .5 * s
        o.append(ln(fx, fy, ox + 2 * s + 34, fy, 'gd')); o.append(el(fx, fy, 5)); o.append(tx(ox + 2 * s + 38, fy + 4, free, 'tbl sm'))
    return ''.join(o)

def pnband(ox, title, V=0, pleft=True, W=200, blabel='', carriers=True, split=False):
    """pn band diagram. V in px: + forward (barrier shrinks), - reverse."""
    B, yh, G = 58 - V, 52, 90
    X = (lambda x: ox + x) if pleft else (lambda x: ox + W - x)
    d = W * .1 * math.sqrt(B / 58); m = W / 2; a, b = m - d, m + d
    o = [tx(ox + W / 2, 22, title, 'tb', 'middle'), rc(min(X(a), X(b)), 34, 2 * d, G + B + 44, 'fg')]
    for y0 in (yh, yh + G):
        o.append(pa(f'M{X(0):.1f},{y0} L{X(a):.1f},{y0} C{X(m):.1f},{y0} {X(m):.1f},{y0 + B} {X(b):.1f},{y0 + B} L{X(W):.1f},{y0 + B}', 'kk'))
    fp, fn = yh + G - 16, yh + B + 16
    o.append(ln(X(0), fp, X(a if split else W), fp, 'rdd'))
    if split: o.append(ln(X(b), fn, X(W), fn, 'rdd'))
    lx, an = (X(W) + 5, 'start') if pleft else (X(W) - 5, 'end')
    o.append(tx(lx, yh + B, EC, '', an)); o.append(tx(lx, yh + B + G + 5, EV, '', an))
    if split:
        o.append(tx(lx, fn + 10, sb('E', 'Fn'), 'trd', an))
        o.append(tx(X(4), fp - 10, sb('E', 'Fp'), 'trd', 'start' if pleft else 'end'))
    else: o.append(tx(lx, fn + 10, EF, 'trd', an))
    hx = X(b + 14)
    o.append(ln(X(a), yh, X(b + 26), yh, 'gd')); o.append(dar(hx, yh + 1, hx, yh + B - 1))
    if blabel: o.append(tx(X(b + 20), (yh + B / 2 + 5) if B > 40 else yh - 7, blabel, 'sm', 'start' if pleft else 'end'))
    if carriers:
        for k in range(4): o.append(el(X(W - 14 - k * 13), yh + B - 8)); o.append(ho(X(12 + k * 13), yh + G + 9))
    o.append(tx(X(a / 2), yh + G + B + 34, 'p', 'tb', 'middle')); o.append(tx(X((b + W) / 2), yh + G + B + 34, 'n', 'tb', 'middle'))
    return ''.join(o)

def msband(ox, title, ntype):
    F, x0, o = 120, ox + 70, []
    o += [tx(ox + 115, 22, title, 'tb', 'middle'), rc(ox, F, 70, 100, 'fg'), ln(ox, F, x0, F, 'rd'), ln(x0, 34, x0, 222, 'th'),
          tx(ox + 35, F + 55, 'metal', '', 'middle'), ln(x0, F, ox + 230, F, 'rdd'), tx(ox + 234, F + 5, EF, 'trd')]
    if ntype: far_c, far_v, bend = F - 12, F + 78, 44
    else: far_c, far_v, bend = F - 66, F + 24, 20
    for far in (far_c, far_v):
        o.append(pa(f'M{x0},{far - bend} Q{x0 + 14},{far} {x0 + 70},{far} L{ox + 230},{far}', 'kk'))
    o.append(tx(ox + 234, far_c - (4 if ntype else -5), EC)); o.append(tx(ox + 234, far_v + 5 + (8 if not ntype else 0), EV))
    if ntype:
        for k in range(4): o.append(el(ox + 220 - k * 13, far_c - 8))
        o.append(tx(x0 + 8, far_c - bend - 10, 'hill', 'sm tbl')); o.append(tx(ox + 150, 240, 'n-Si: electrons blocked', 'sm', 'middle'))
    else:
        for k in range(4): o.append(ho(x0 + 9 + k * 11, far_v - bend + 12 + k * 4.2 + (3 if k else 0)))
        o.append(tx(ox + 150, 240, 'p-Si: holes pile up', 'sm', 'middle'))
    return ''.join(o)

def profile(ox, title, fwd):
    o, base = [tx(ox + 210, 20, title, 'tb', 'middle')], 190
    o += [rc(ox + 190, 34, 40, base - 34, 'fg'), ln(ox + 20, base, ox + 410, base, 'k'), tx(ox + 210, 50, 'depletion', 'sm tm', 'middle'),
          tx(ox + 105, base + 20, 'p-region', 'tb', 'middle'), tx(ox + 325, base + 20, 'n-region', 'tb', 'middle'),
          tx(ox + 20, base + 36, 'contact', 'sm tm', 'middle'), tx(ox + 410, base + 36, 'contact', 'sm tm', 'middle'),
          ln(ox + 20, 40, ox + 20, base, 'th'), ln(ox + 410, 40, ox + 410, base, 'th')]
    n0, p0 = base - 26, base - 12
    o += [ln(ox + 20, n0, ox + 190, n0, 'gd'), ln(ox + 230, p0, ox + 410, p0, 'gd')]
    if fwd:
        o += [f'<polygon points="{ox + 20},{n0} {ox + 190},{n0} {ox + 190},70" class="fb"/>', ln(ox + 20, n0, ox + 190, 70, 'bl'),
              f'<polygon points="{ox + 230},{p0} {ox + 410},{p0} {ox + 230},110" class="fr"/>', ln(ox + 230, 110, ox + 410, p0, 'rd'),
              tx(ox + 184, 64, sb("n'", 'p'), 'tbl', 'end'), tx(ox + 236, 104, sb("p'", 'n'), 'trd'),
              tx(ox + 130, 150, 'extra electrons', 'sm tbl', 'middle'), tx(ox + 290, 170, 'extra holes', 'sm trd', 'middle')]
    else:
        o += [ln(ox + 20, n0, ox + 190, base, 'bl'), ln(ox + 230, base, ox + 410, p0, 'rd'),
              tx(ox + 186, base - 40, '≈ 0 here', 'tbl sm', 'end'), tx(ox + 234, base - 40, '≈ 0 here', 'trd sm')]
    o += [tx(ox + 14, n0 + 4, sb('n', 'p0'), 'tbl sm', 'end'), tx(ox + 416, p0 + 4, sb('p', 'n0'), 'trd sm')]
    return ''.join(o)

def curve(f, x1, x2, step=4):
    pts = []; x = x1
    while x <= x2 + .01: pts.append(f'{x:.1f},{f(x):.1f}'); x += step
    return 'M' + ' L'.join(pts)

FIGS = {}
FIGS['lattice_T'] = svg(lattice(50, 70, 'At 0 K') + lattice(300, 70, 'At 300 K', hole=True, free='free electron'),
    'Left: every electron (blue dot) is locked in a bond. Right: heat breaks one bond. That gives one free electron and one hole (red ring).', 560, 250)
FIGS['lattice_dope'] = svg(lattice(50, 70, 'n-type (P added)', centre='P', free='spare electron') + lattice(360, 70, 'p-type (B added)', centre='B', hole=True),
    'Left: phosphorus brings 5 electrons, 4 bond, 1 is spare. Right: boron brings only 3, so one bond has a hole.', 560, 250)

FIGS['drift'] = svg(
    tx(60, 96, '+', 'tb', 'middle') + tx(420, 96, '−', 'tb', 'middle') + f'<rect x="80" y="60" width="320" height="64" class="k"/>'
    + ar(170, 36, 310, 36, 'k') + tx(240, 28, 'electric field ℰ', '', 'middle')
    + ho(170, 80) + ar(180, 80, 240, 80, 'rd') + tx(250, 85, 'hole goes with ℰ', 'trd sm')
    + el(310, 106) + ar(300, 106, 240, 106, 'bl') + tx(232, 111, 'electron goes against ℰ', 'tbl sm', 'end')
    + ar(170, 150, 310, 150, 'kk') + tx(240, 172, 'current I (same direction for both)', '', 'middle'),
    'Drift. The field pushes holes one way and electrons the other. Both give current in the direction of $\\mathcal{E}$.', 480, 185)

_dots = ''.join(el(70 + i * 9 + (j * 37 % 7), 182 - j * 9, 3) for i in range(34) for j in range(11) if 182 - j * 9 > 62 + (i * 9) * 0.30)
FIGS['diffusion'] = svg(
    ln(50, 190, 400, 190, 'k') + ln(50, 190, 50, 30, 'k') + tx(405, 195, 'x') + tx(44, 28, 'n', '', 'end')
    + ln(60, 50, 380, 146, 'bl') + _dots
    + ar(150, 215, 290, 215, 'bl') + tx(220, 234, 'electrons spread out this way', 'tbl sm', 'middle')
    + ar(290, 252, 150, 252, 'rd') + tx(220, 271, 'so the current points this way', 'trd sm', 'middle')
    + tx(120, 52, 'crowded', 'sm') + tx(330, 118, 'empty', 'sm'),
    'Diffusion. Electrons move from crowded to empty. Electrons are negative, so the current points the opposite way.', 440, 280)

_f = lambda x: 170 - 130 / (1 + math.exp((x - 225) / 20))
FIGS['fermi'] = svg(
    ln(50, 170, 410, 170, 'k') + ln(50, 170, 50, 24, 'k') + tx(414, 175, 'E') + tx(44, 28, 'f', '', 'end')
    + tx(44, 45, '1', '', 'end') + tx(44, 110, '½', '', 'end') + tx(44, 175, '0', '', 'end')
    + ln(50, 105, 225, 105, 'gd') + ln(225, 105, 225, 170, 'gd') + pa(curve(_f, 52, 400), 'bl')
    + f'<circle cx="225" cy="105" r="4" class="hr"/>' + tx(225, 190, EF, 'trd', 'middle')
    + tx(100, 30, 'low energy: full', 'sm', 'middle') + tx(350, 160, 'high energy: empty', 'sm', 'middle'),
    'The Fermi function $f(E)$: the chance that a state at energy E holds an electron. At $E = E_F$ it is exactly ½.', 440, 200)

def band1(ox, title, fy, ne, nh, flabel=EF):
    o = [tx(ox + 65, 22, title, 'tb', 'middle'), ln(ox + 5, 48, ox + 125, 48, 'kk'), ln(ox + 5, 160, ox + 125, 160, 'kk'),
         ln(ox + 5, 106, ox + 125, 106, 'gd'), ln(ox + 5, fy, ox + 125, fy, 'rd'),
         tx(ox + 130, 53, EC), tx(ox + 130, 165, EV), tx(ox + 130, fy + 5, flabel, 'trd')]
    if abs(fy - 106) > 6: o.append(tx(ox + 130, 111, EI, 'tm'))
    o += [el(ox + 20 + k * 15, 39) for k in range(ne)] + [ho(ox + 20 + k * 15, 170) for k in range(nh)]
    return ''.join(o)
FIGS['bands3'] = svg(band1(20, 'intrinsic', 104, 1, 1, sb('E', 'F') + ' = ' + EI) + band1(215, 'n-type', 72, 7, 0) + band1(385, 'p-type', 136, 0, 7),
    '$E_F$ is a marker for how full the bands are. Near $E_C$: lots of electrons (n-type). Near $E_V$: lots of holes (p-type). In the middle: intrinsic.', 550, 190)

FIGS['vac'] = svg(
    ln(50, 30, 330, 30, 'gd') + ln(50, 120, 330, 120, 'kk') + ln(50, 142, 330, 142, 'rd') + ln(50, 215, 330, 215, 'kk')
    + tx(336, 35, EVAC + ' (free, outside)') + tx(336, 125, EC) + tx(336, 147, EF, 'trd') + tx(336, 220, EV)
    + ar(110, 32, 110, 118, 'k') + tx(104, 80, 'χ', '', 'end') + ar(190, 32, 190, 140, 'rd') + tx(184, 95, 'φ', 'trd', 'end')
    + dar(270, 122, 270, 213, 'th') + tx(264, 172, sb('E', 'G'), '', 'end'),
    'Everything is measured down from the vacuum level. $\\chi$ goes down to $E_C$ (same for all Si). $\\phi$ goes down to $E_F$ (changes with doping).', 500, 240)

FIGS['tilt'] = svg(
    tx(110, 22, 'No voltage', 'tb', 'middle') + ln(20, 60, 200, 60, 'kk') + ln(20, 150, 200, 150, 'kk') + ln(20, 136, 200, 136, 'rdd')
    + tx(205, 65, EC) + tx(205, 141, EF, 'trd') + tx(205, 160, EV)
    + tx(385, 22, 'Voltage on: + left, − right', 'tb', 'middle') + tx(290, 50, '+', 'tb') + tx(476, 50, '−', 'tb')
    + ar(320, 45, 450, 45, 'k') + tx(385, 38, 'ℰ', '', 'middle')
    + ln(290, 100, 480, 62, 'kk') + ln(290, 190, 480, 152, 'kk') + ln(290, 176, 480, 138, 'rdd')
    + tx(485, 67, EC) + tx(485, 137, EF, 'trd') + tx(485, 161, EV)
    + el(430, 65) + ar(420, 67, 370, 77, 'bl') + tx(330, 116, 'electron rolls down', 'tbl sm')
    + ho(360, 184) + ar(370, 182, 420, 172, 'rd') + tx(392, 200, 'hole floats up', 'trd sm')
    + dar(282, 100, 282, 62, 'th') + ln(282, 62, 480, 62, 'gd') + tx(276, 86, 'eV', 'sm', 'end'),
    'A voltage tilts the bands. The + end is the low end. Electrons roll downhill to +. Holes float uphill to −.', 530, 215)

FIGS['contact_before'] = svg(
    ln(40, 30, 440, 30, 'gd') + tx(240, 22, EVAC, '', 'middle')
    + tx(120, 250, 'n-Si', 'tb', 'middle') + tx(360, 250, 'p-Si', 'tb', 'middle')
    + ln(40, 110, 200, 110, 'kk') + ln(40, 124, 200, 124, 'rd') + ln(40, 220, 200, 220, 'kk')
    + ln(280, 110, 440, 110, 'kk') + ln(280, 204, 440, 204, 'rd') + ln(280, 220, 440, 220, 'kk')
    + tx(34, 115, EC, '', 'end') + tx(34, 133, EF, 'trd', 'end') + tx(34, 225, EV, '', 'end')
    + tx(446, 115, EC) + tx(446, 203, EF, 'trd') + tx(446, 228, EV)
    + ar(205, 128, 274, 198, 'bl') + tx(252, 146, 'electrons', 'tbl sm') + tx(252, 161, 'want to drop', 'tbl sm')
    + ar(90, 32, 90, 122, 'th') + tx(96, 75, sb('φ', 'n') + ' small') + ar(330, 32, 330, 202, 'th') + tx(336, 75, sb('φ', 'p') + ' big'),
    'Before contact. Same $E_C$ and $E_V$ on both sides. But $E_F$ is high in the n-Si and low in the p-Si.', 480, 262)

FIGS['contact_after'] = svg(pnband(60, 'After contact', pleft=False, W=360, blabel='e' + sb('V', '0')),
    'After contact. $E_F$ is one flat line. The bands had to bend to make that happen. The grey strip is where they bend.', 480, 240)

FIGS['ms'] = svg(msband(10, 'Ohmic (metal on p-Si)', False) + msband(280, 'Schottky (metal on n-Si)', True),
    'Same metal ($\\phi_m$ bigger than $\\phi_{Si}$) on two kinds of Si. The bands bend up towards the metal both times. Good for holes, bad for electrons.', 550, 250)

_ions = ''.join(tx(207 + (k % 3) * 15, 62 + (k // 3) * 22, '−', 'tbl tb') for k in range(9)) + ''.join(tx(256 + (k % 3) * 15, 62 + (k // 3) * 22, '+', 'trd tb') for k in range(9))
FIGS['pn_ions'] = svg(
    f'<rect x="30" y="40" width="440" height="80" class="k"/>' + rc(200, 40, 100, 80, 'fg') + ln(250, 40, 250, 120, 'th') + _ions
    + ''.join(ho(50 + (k % 5) * 30, 62 + (k // 5) * 36) for k in range(10)) + ''.join(el(330 + (k % 5) * 30, 62 + (k // 5) * 36) for k in range(10))
    + ar(295, 24, 205, 24, 'k') + tx(250, 16, 'ℰ', '', 'middle')
    + tx(115, 142, 'p-side: holes', 'tb', 'middle') + tx(385, 142, 'n-side: electrons', 'tb', 'middle') + tx(250, 142, 'depletion', 'sm', 'middle')
    + tx(250, 158, 'no carriers, only ions', 'sm tm', 'middle'),
    'A pn junction. Near the join the carriers are gone. What is left is fixed ions: − on the p-side, + on the n-side. They make a field $\\mathcal{E}$ pointing from n to p.', 500, 168)

FIGS['pn_band0'] = svg(pnband(80, 'No bias', W=340, blabel='e' + sb('V', '0')),
    'Band diagram of the same junction. $E_F$ flat. The step in the bands is the barrier, height $eV_0$.', 500, 240)

FIGS['pn_bias'] = svg(pnband(20, 'No bias', blabel='e' + sb('V', '0')) + pnband(295, 'Forward bias', V=30, split=True, blabel='smaller') + pnband(570, 'Reverse bias', V=-40, split=True, blabel='bigger'),
    'Forward bias (+ on p) lowers the barrier, so carriers pour over. Reverse bias (+ on n) raises it, so nothing gets over.', 830, 290)

FIGS['profile_fwd'] = svg(profile(50, 'Forward bias: minority carriers', True),
    'Forward bias. Extra minority carriers are injected at the junction. They fall in a straight line back to normal at the contact.', 520, 235)
FIGS['profile_rev'] = svg(profile(50, 'Reverse bias: minority carriers', False),
    'Reverse bias. The field sweeps minority carriers away at the junction, so they drop to about zero there.', 520, 235)

_iv = lambda x: 150 - 1.5 * (math.exp((x - 170) / 28) - 1) if x >= 170 else 150 + 5 * (1 - math.exp((x - 170) / 14))
FIGS['iv'] = svg(
    ln(30, 150, 410, 150, 'k') + ln(170, 195, 170, 20, 'k') + tx(414, 155, 'V') + tx(164, 22, 'I', '', 'end')
    + pa(curve(_iv, 40, 291, 3), 'bl') + tx(300, 60, 'forward: shoots up', 'tbl sm') + tx(100, 175, 'reverse: tiny and flat', 'trd sm', 'middle'),
    'The diode I–V curve. Forward: exponential. Reverse: a tiny constant leak.', 450, 205)

FIGS['rhoE'] = svg(
    ''.join(ln(x, 30, x, 345, 'gd') for x in (120, 160, 360))
    + tx(34, 44, 'ρ(x)', 'tb') + ln(40, 110, 440, 110, 'k') + rc(120, 110, 40, 70, 'fb') + rc(160, 96, 200, 14, 'fr')
    + f'<rect x="120" y="110" width="40" height="70" class="bl"/><rect x="160" y="96" width="200" height="14" class="rd"/>'
    + tx(112, 150, '−e' + sb('N', 'A'), 'tbl', 'end') + tx(260, 88, '+e' + sb('N', 'D'), 'trd', 'middle')
    + tx(80, 128, 'p', 'tb', 'middle') + tx(410, 128, 'n', 'tb', 'middle')
    + tx(34, 222, 'ℰ(x)', 'tb') + ln(40, 250, 440, 250, 'k') + pa('M40,250 L120,250 L160,330 L360,250 L440,250', 'kk')
    + tx(160, 348, sb('ℰ', '0') + ' (biggest)', '', 'middle') + tx(112, 300, 'steep', 'sm tbl', 'end') + tx(270, 305, 'gentle', 'sm trd')
    + tx(120, 368, '−' + sb('w', 'p'), '', 'middle') + tx(160, 368, '0', '', 'middle') + tx(360, 368, sb('w', 'n'), '', 'middle'),
    'Top: the charge. A tall thin block on the heavily doped side, a wide flat block on the lightly doped side. Same area. Bottom: the field. A triangle, deepest at the junction.', 480, 378)

# ------------------------------------------------------------------ text -> html
def inline(p):
    p = html.escape(p, quote=False)
    p = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', p)
    return p

def fmt(text):
    out, blocks, i = [], [b.strip() for b in re.split(r'\n\s*\n', text.strip()) if b.strip()], 0
    while i < len(blocks):
        b = blocks[i]; i += 1
        m = re.fullmatch(r'\{\{fig:(\w+)\}\}', b)
        if m: out.append(FIGS[m.group(1)]); continue
        m = re.fullmatch(r'\{\{img:([^|}]+)\|?([^}]*)\}\}', b)
        if m:
            assert os.path.exists(os.path.join(here, 'img', m.group(1))), m.group(1)
            cap = inline(m.group(2))
            out.append(f'<figure class="fig"><img src="img/{m.group(1)}" alt="{html.escape(m.group(2))}" loading="lazy"><figcaption>{cap}</figcaption></figure>'); continue
        if b.startswith('## '): out.append(f'<h3 class="sec">{inline(b[3:])}</h3>'); continue
        if b.startswith('? '):
            assert i < len(blocks) and blocks[i].startswith('= '), b
            a = blocks[i][2:]; i += 1
            out.append(f'<div class="check"><span class="h">Check.</span> {inline(b[2:]).replace(chr(10), "<br>")}'
                       f'<button class="b">Show answer</button><div class="ca" hidden>{inline(a).replace(chr(10), "<br>")}</div></div>'); continue
        lines = b.split('\n')
        if all(l.startswith('>') for l in lines):
            out.append('<div class="key">' + fmt('\n'.join(l[1:].lstrip() if l[1:].strip() else '' for l in lines)) + '</div>'); continue
        if all(l.startswith('|') for l in lines):
            rows = [[inline(c.strip()) for c in l.strip('|').split('|')] for l in lines]
            t = '<tr>' + ''.join(f'<th>{c}</th>' for c in rows[0]) + '</tr>'
            t += ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows[1:])
            out.append(f'<div class="tw"><table>{t}</table></div>'); continue
        if all(l.startswith('- ') for l in lines):
            out.append('<ul>' + ''.join(f'<li>{inline(l[2:])}</li>' for l in lines) + '</ul>'); continue
        p = inline(b)
        if p.startswith('$$') and p.endswith('$$') and p.count('$$') == 2: out.append(f'<div class="dm">{p}</div>')
        else: out.append('<p>' + re.sub(r'\n(?=\$\$)|(?<=\$\$)\n', '', p).replace('\n', '<br>') + '</p>')
    return '\n'.join(out)

def parse():
    parts, st = [], {'t': None, 'q': None, 'mode': None, 'buf': []}
    def flush():
        text = '\n'.join(st['buf']); st['buf'] = []; m = st['mode']; st['mode'] = None
        if m is None: return
        kind, arg = m
        if kind == 'notes': st['t']['notes'] = fmt(text)
        elif kind == 'q': st['q']['q'] = fmt(text)
        elif kind == 's': st['q']['steps'].append({'t': inline(arg), 'b': fmt(text)})
        elif kind == 'a': st['q']['a'] = fmt(arg + ('\n' + text if text.strip() else ''))
    for f in sorted(glob.glob(os.path.join(here, 'content', '*.txt'))):
        for line in open(f, encoding='utf-8').read().split('\n'):
            if line.startswith('@@part '): flush(); parts.append({'title': line[7:].strip(), 'topics': []})
            elif line.startswith('@@topic '):
                flush(); i, t, src = [x.strip() for x in line[8:].split('|')]
                st['t'] = {'id': i, 'n': i if i.isdigit() else '', 'title': t, 'src': src, 'notes': '', 'qs': []}
                parts[-1]['topics'].append(st['t'])
            elif line.startswith('@notes'): flush(); st['mode'] = ('notes', None)
            elif line.startswith('@q '):
                flush(); st['q'] = {'ref': line[3:].strip(), 'q': '', 'steps': [], 'a': ''}
                st['t']['qs'].append(st['q']); st['mode'] = ('q', None)
            elif line.startswith('@s '): flush(); st['mode'] = ('s', line[3:].strip())
            elif line.startswith('@a'): flush(); st['mode'] = ('a', line[2:].strip())
            else: st['buf'].append(line)
        flush()
    for p in parts:
        for t in p['topics']:
            assert t['notes'], t['title']
            for q in t['qs']: assert q['q'] and q['steps'] and q['a'], q['ref']
    return parts

if __name__ == '__main__':
    data = parse()
    js = 'window.DATA=' + json.dumps(data, ensure_ascii=False) + ';\n'
    open(os.path.join(here, 'data.js'), 'w', encoding='utf-8').write(js)
    print('topics', sum(len(p['topics']) for p in data), 'questions', sum(len(t['qs']) for p in data for t in p['topics']))
    ver = hashlib.md5(js.encode()).hexdigest()[:8]
    ip = os.path.join(here, 'index.html'); h = open(ip, encoding='utf-8').read()
    h = re.sub(r'<script src="data\.js(\?v=\w+)?"></script>', f'<script src="data.js?v={ver}"></script>', h)
    open(ip, 'w', encoding='utf-8').write(h)
