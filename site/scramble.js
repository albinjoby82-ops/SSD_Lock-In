/* "New numbers" generators for the SSD tutorial calculation questions.
   Each generator returns { q, answers: [{label, value, unit, tol}], steps: [markdown] }.
   Methods and constants match the worked answers in questions/*.md and notes/*.md. */
(() => {
'use strict';

const E = 1.6e-19, KT = 0.026, NI = 1.45e10, NI2 = 2.1e20, NC = 3.2e19, NV = 1.8e19;
const CHI = 4.05, EG = 1.12, K = 8.62e-5, EPS0 = 8.85e-14, ER = 11.9;
const ln = Math.log, exp = Math.exp;

const pick = a => a[Math.floor(Math.random() * a.length)];
const SUPD = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const sup = n => String(n).replace(/[0-9-]/g, c => SUPD[c]);

// 4.7 × 10¹³ style, or a plain decimal for everyday sizes
function f(x, sig = 2) {
  if (x === 0) return '0';
  const neg = x < 0; x = Math.abs(x);
  let out;
  if (x >= 0.01 && x < 1e4) {
    out = String(+x.toPrecision(Math.max(sig, x >= 100 ? 3 : sig)));
  } else {
    let ex = Math.floor(Math.log10(x)), m = +(x / Math.pow(10, ex)).toPrecision(sig);
    if (m >= 10) { m = +(m / 10).toPrecision(sig); ex++; }
    out = (m === 1 ? '' : m + ' × ') + '10' + sup(ex);
  }
  return (neg ? '−' : '') + out;
}
const f3 = x => f(x, 3);
const eV = x => (+x.toFixed(2)).toString();          // 0.12
const eV3 = x => (+x.toFixed(3)).toString();
const nice = [1, 2, 3, 5];
const pow = (lo, hi) => { const out = []; for (let e = lo; e <= hi; e++) nice.forEach(m => out.push(m * Math.pow(10, e))); return out; };

// answers: relative tolerance by default; abs tolerance for small eV numbers
const rel = (label, value, unit, r = 0.04) => ({ label, value, unit, tol: { rel: r } });
const abs = (label, value, unit, a = 0.015) => ({ label, value, unit, tol: { abs: a } });

const G = {};

// ---------------------------------------------------------------- Ch1 Q5: n and p from doping
G['02-doping-carrier-concentration#Q5'] = () => {
  const NA = pick(pow(15, 18)), acc = pick(['boron', 'aluminium']);
  const NDm = pick([1e21, 2e21, 5e21, 1e22, 3e22, 1e23, 5e23, 1e24]), don = pick(['phosphorus', 'arsenic']);
  const ND = NDm / 1e6;
  return {
    q: `Find the hole and electron concentrations at room temperature for:\n\n1. Si doped with **${acc}**, N = ${f(NA)} cm⁻³\n2. Si doped with **${don}**, N = ${f(NDm)} **m⁻³**`,
    answers: [rel('1. p', NA, 'cm⁻³'), rel('1. n', NI2 / NA, 'cm⁻³'), rel('2. n', ND, 'cm⁻³'), rel('2. p', NI2 / ND, 'cm⁻³')],
    steps: [
      `**1. ${acc[0].toUpperCase() + acc.slice(1)} is group III, so p-type.**\n\np = N_A = **${f(NA)} cm⁻³**\n\nn = nᵢ² ÷ N_A = 2.1 × 10²⁰ ÷ ${f(NA)} = **${f(NI2 / NA)} cm⁻³**\n\nFrom: §3, Equation 5`,
      `**2. ${don[0].toUpperCase() + don.slice(1)} is group V, so n-type.**\n\nUnits trap first: ${f(NDm)} m⁻³ ÷ 10⁶ = ${f(ND)} cm⁻³\n\nn = N_D = **${f(ND)} cm⁻³**\n\np = nᵢ² ÷ N_D = 2.1 × 10²⁰ ÷ ${f(ND)} = **${f(NI2 / ND)} cm⁻³**\n\nFrom: §3 Equation 4, §6`,
    ],
  };
};

// ---------------------------------------------------------------- Ch1 Q7: conductivity and resistance
const MOB = { 1e15: [1400, 500], 1e16: [1200, 400], 1e18: [300, 150] };
G['03-drift#Q7'] = () => {
  const Wum = pick([1, 2, 5]), tnm = pick([200, 500, 1000]), Lum = pick([5, 10, 20, 50]);
  const NA = pick([1e15, 1e16, 1e18]), ND = pick([1e15, 1e16, 1e18]);
  const mp = MOB[NA][1], mn = MOB[ND][0];
  const sp = E * NA * mp, sn = E * ND * mn;
  const W = Wum * 1e-4, t = tnm * 1e-7, L = Lum * 1e-4, A = W * t;
  return {
    q: `A Si resistor is a bar with W = ${Wum} μm, t = ${tnm} nm and L = ${Lum} × 10⁻⁶ m. Current flows along L.\n\nMobilities (from the graph in §4):\n\n| Doping (cm⁻³) | μₙ | μₚ |\n|---|---|---|\n| 10¹⁵ | 1400 | 500 |\n| 10¹⁶ | 1200 | 400 |\n| 10¹⁸ | 300 | 150 |\n\nSample A is **p-type**, N_A = ${f(NA)} cm⁻³. Sample B is **n-type**, N_D = ${f(ND)} cm⁻³.\n\n1. Find σ for each sample.\n2. Find R for each sample.`,
    answers: [rel('σ of A', sp, '(Ω·cm)⁻¹'), rel('σ of B', sn, '(Ω·cm)⁻¹'), rel('R of A', L / (sp * A), 'Ω', 0.06), rel('R of B', L / (sn * A), 'Ω', 0.06)],
    steps: [
      `**σ of A (p-type).** p = N_A. Read μₚ = ${mp}.\n\nσ ≈ e p μₚ = 1.6 × 10⁻¹⁹ × ${f(NA)} × ${mp} = **${f3(sp)} (Ω·cm)⁻¹**\n\nFrom: §6, Equation 8`,
      `**σ of B (n-type).** n = N_D. Read μₙ = ${mn}.\n\nσ ≈ e n μₙ = 1.6 × 10⁻¹⁹ × ${f(ND)} × ${mn} = **${f3(sn)} (Ω·cm)⁻¹**\n\nFrom: §6, Equation 8`,
      `**Convert to cm** (units trap, §7):\n- W = ${Wum} μm = ${f(W)} cm\n- t = ${tnm} nm = ${f(t)} cm\n- L = ${Lum} μm = ${f(L)} cm\n\nA = t × W = ${f(A)} cm²\n\nFrom: §7`,
      `**Resistance:** R = L ÷ (σ A) = ${f(L)} ÷ (σ × ${f(A)}) = ${f(L / A)} ÷ σ\n\nR of A = ${f(L / A)} ÷ ${f3(sp)} = **${f(L / (sp * A))} Ω**\n\nR of B = ${f(L / A)} ÷ ${f3(sn)} = **${f(L / (sn * A))} Ω**\n\nFrom: §6, Equation 9`,
    ],
  };
};

// ---------------------------------------------------------------- Ch1 Q8: diffusion current
G['04-diffusion#Q8'] = () => {
  const holes = Math.random() < 0.35;
  const c1 = pick([1e17, 2e17, 5e17, 1e18, 2e18]), frac = pick([0.2, 0.3, 0.5, 0.7]), c2 = c1 * frac;
  const L = pick([0.01, 0.02, 0.05, 0.1, 0.2]), D = holes ? pick([10, 12.5, 15]) : pick([25, 35, 50]);
  const grad = (c1 - c2) / L, J = E * D * grad;
  const who = holes ? 'hole' : 'electron', Ds = holes ? 'D_p' : 'D_n', layer = holes ? 'p-Si' : 'n-Si';
  return {
    q: `In a ${layer} layer at 300 K, the ${who} concentration falls in a straight line from ${f(c1)} cm⁻³ to ${f(c2)} cm⁻³ over ${L} cm.\n\n${Ds} = ${D} cm²/s.\n\nFind the size of the diffusion current density.`,
    answers: [rel('gradient', grad, 'cm⁻⁴'), rel('J', J, 'A/cm²')],
    steps: [
      `**Step 1: gradient** (straight line)\n\nChange = ${f(c1)} − ${f(c2)} = ${f(c1 - c2)} cm⁻³\n\nSlope size = ${f(c1 - c2)} ÷ ${L} = **${f(grad)} cm⁻⁴**\n\nFrom: §2`,
      `**Step 2: multiply**\n\nJ = e ${Ds} × slope = 1.6 × 10⁻¹⁹ × ${D} × ${f(grad)}\n\nJ = **${f3(J)} A/cm²**\n\n**Direction:** ${holes ? 'holes flow to the low end, and so does the current (holes are +).' : 'electrons flow to the low end. Current points the other way, back to the high end.'}\n\nFrom: §2, Equation 11`,
    ],
  };
};

// ---------------------------------------------------------------- Ch1 Q9: built-in field from graded doping
G['04-diffusion#Q9'] = () => {
  const a = pick([5e16, 1e17, 2e17, 5e17]), b = a * pick([5, 10, 20, 25]);
  const L = pick([0.01, 0.02, 0.025, 0.03, 0.04, 0.05, 0.1].filter(l => b * l <= 0.9 * a + 1));
  const x2 = L / 2, E0 = KT * b / a, E2 = KT * b / (a - b * x2);
  return {
    q: `n-type Si is ${L} cm long. Its doping changes along x:\n\n$$N(x) = ${texNum(a)} - ${texNum(b)}\\,x$$\n\n(N in cm⁻³, x in cm. No bias.)\n\n1. Derive the internal field E(x).\n2. Find E at x = 0 and at x = ${x2} cm.\n3. Which way does it point?`,
    answers: [rel('E at x = 0', E0, 'V/cm'), rel(`E at x = ${x2}`, E2, 'V/cm')],
    steps: [
      `**No current**, so Jₙ = 0:\n\n$$E = -\\frac{kT}{e}\\,\\frac{1}{n}\\,\\frac{dn}{dx}$$\n\nn = N(x), so dn/dx = −${f(b)}.\n\nFrom: §5, §7`,
      `**Put it in:**\n\n$$E(x) = -0.026 \\times \\frac{-${texNum(b)}}{${texNum(a)} - ${texNum(b)}\\,x} = \\frac{${texNum(KT * b)}}{${texNum(a)} - ${texNum(b)}\\,x}$$\n\nAt x = 0: E = 0.026 × ${f(b)} ÷ ${f(a)} = **${f3(E0)} V/cm**\n\nAt x = ${x2}: N = ${f(a - b * x2)}, so E = 0.026 × ${f(b)} ÷ ${f(a - b * x2)} = **${f3(E2)} V/cm**\n\nFrom: §7`,
      `**Direction:** doping is high on the left. Electrons diffuse right. The field must push them back left. Electrons move against E, so **E points right (+x)**. The answer is positive, which agrees.\n\nFrom: §7`,
    ],
  };
};
function texNum(x) {
  let ex = Math.floor(Math.log10(x)), m = +(x / Math.pow(10, ex)).toPrecision(3);
  if (m >= 10) { m = +(m / 10).toPrecision(3); ex++; }
  return (m === 1 ? '' : m + '\\times') + '10^{' + ex + '}';
}

// ---------------------------------------------------------------- Ch1 Q10: Fermi-Dirac temperature
G['05-fermi-level#Q10'] = () => {
  const EF = pick([4.5, 5.0, 5.5, 6.25, 7.1]), dE = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]), P = pick([0.01, 0.02, 0.05, 0.1]);
  const below = Math.random() < 0.5;
  const ratio = (1 - P) / P, kT = dE / ln(ratio), T = kT / K;
  const pct = Math.round(P * 100) + '%';
  const q = below
    ? `A material has its Fermi level at ${EF} eV.\n\nAt what temperature is there a **${pct}** chance that a state **${dE} eV below** E_F is **empty**?`
    : `A material has its Fermi level at ${EF} eV.\n\nAt what temperature is there a **${pct}** chance that a state **${dE} eV above** E_F is **occupied**?`;
  return {
    q,
    answers: [rel('kT', kT, 'eV', 0.03), rel('T', T, 'K', 0.03)],
    steps: [
      below
        ? `**Set up.** Empty = 1 − f(E) = ${P}, so f(E) = ${+(1 - P).toFixed(2)}.\n\nE − E_F = −${dE} eV (below).\n\n$$${+(1 - P).toFixed(2)} = \\frac{1}{1 + e^{-${dE}/kT}}$$\n\nFrom: §4, Equation 13`
        : `**Set up.** Occupied = f(E) = ${P}.\n\nE − E_F = +${dE} eV (above).\n\n$$${P} = \\frac{1}{1 + e^{${dE}/kT}}$$\n\nFrom: §4, Equation 13`,
      below
        ? `**Solve.**\n\n$$e^{-${dE}/kT} = \\frac{1}{${+(1 - P).toFixed(2)}} - 1 = ${f(1 / ratio, 3)}$$\n\n−${dE} ÷ kT = ln(${f(1 / ratio, 3)}) = −${(ln(ratio)).toFixed(3)}\n\nkT = ${dE} ÷ ${(ln(ratio)).toFixed(3)} = **${kT.toFixed(4)} eV**`
        : `**Solve.**\n\n$$e^{${dE}/kT} = \\frac{1}{${P}} - 1 = ${f(ratio, 3)}$$\n\n${dE} ÷ kT = ln(${f(ratio, 3)}) = ${(ln(ratio)).toFixed(3)}\n\nkT = ${dE} ÷ ${(ln(ratio)).toFixed(3)} = **${kT.toFixed(4)} eV**`,
      `**Temperature.**\n\nT = kT ÷ k = ${kT.toFixed(4)} ÷ (8.62 × 10⁻⁵) = **${Math.round(T)} K**\n\nNote: E_F = ${EF} eV is not needed. Only the gap E − E_F matters.\n\nFrom: §4`,
    ],
  };
};

// ---------------------------------------------------------------- Ch1 Q16: doping from workfunction
G['06-workfunction#Q16'] = () => {
  const pType = Math.random() < 0.6;
  if (pType) {
    const phi = +(4.95 + 0.01 * Math.floor(Math.random() * 18)).toFixed(2);
    const d = CHI + EG - phi, p = NV * exp(-d / KT);
    return {
      q: `A Si sample has workfunction φ = ${phi} eV. χ = 4.05 eV, E_G = 1.12 eV.\n\nIs it n-type or p-type? Find the doping density.`,
      answers: [abs('E_F − E_V', d, 'eV', 0.006), rel('N_A', p, 'cm⁻³', 0.08)],
      steps: [
        `**Which type?** Midgap is χ + E_G/2 = 4.05 + 0.56 = 4.61 eV below E_vac.\n\nφ = ${phi} is bigger, so E_F is **below** midgap. **p-type.**\n\nFrom: §1, §2`,
        `**Place E_F.** E_F − E_V = (χ + E_G) − φ = 5.17 − ${phi} = **${eV(d)} eV**\n\nFrom: Equation 16`,
        `**Holes:**\n\n$$p = N_V\\, e^{-(E_F - E_V)/kT} = 1.8\\times10^{19} \\times e^{-${eV(d)}/0.026}$$\n\np = 1.8 × 10¹⁹ × ${f(exp(-d / KT), 3)} = **${f3(p)} cm⁻³**\n\nSo **N_A ≈ ${f3(p)} cm⁻³**\n\nFrom: Topic 5 Equation 14`,
      ],
    };
  }
  const phi = +(4.10 + 0.01 * Math.floor(Math.random() * 14)).toFixed(2);
  const d = phi - CHI, n = NC * exp(-d / KT);
  return {
    q: `A Si sample has workfunction φ = ${phi} eV. χ = 4.05 eV, E_G = 1.12 eV.\n\nIs it n-type or p-type? Find the doping density.`,
    answers: [abs('E_C − E_F', d, 'eV', 0.006), rel('N_D', n, 'cm⁻³', 0.08)],
    steps: [
      `**Which type?** Midgap is χ + E_G/2 = 4.61 eV below E_vac.\n\nφ = ${phi} is smaller, so E_F is **above** midgap. **n-type.**\n\nFrom: §1, §2`,
      `**Place E_F.** E_C − E_F = φ − χ = ${phi} − 4.05 = **${eV(d)} eV**\n\nFrom: Equation 16`,
      `**Electrons:**\n\n$$n = N_C\\, e^{-(E_C - E_F)/kT} = 3.2\\times10^{19} \\times e^{-${eV(d)}/0.026}$$\n\nn = 3.2 × 10¹⁹ × ${f(exp(-d / KT), 3)} = **${f3(n)} cm⁻³**\n\nSo **N_D ≈ ${f3(n)} cm⁻³**\n\nFrom: Topic 5 Equation 14`,
    ],
  };
};

// ---------------------------------------------------------------- Ch2 Q1: φ of n-type Si
G['06-workfunction#Q1'] = () => {
  const ND = pick(pow(15, 18)), dop = pick(['P', 'As']);
  const d = KT * ln(NC / ND);
  return {
    q: `χ = 4.05 eV. Si is doped with ${dop}, N_D = ${f(ND)} cm⁻³.\n\nFind E_C − E_F and the workfunction φ. Then plot E_C, E_V, E_F, χ and φ against E_vac.`,
    answers: [abs('E_C − E_F', d, 'eV'), abs('φ', CHI + d, 'eV')],
    steps: [
      `**${dop} is a donor**, so n-type: n = N_D.\n\nE_C − E_F = 0.026 × ln(3.2 × 10¹⁹ ÷ ${f(ND)})\n\n= 0.026 × ln(${f(NC / ND, 3)}) = 0.026 × ${ln(NC / ND).toFixed(2)} = **${eV(d)} eV**\n\nFrom: §3`,
      `**Workfunction:** φ = χ + (E_C − E_F) = 4.05 + ${eV(d)} = **${eV(CHI + d)} eV**\n\nDraw: E_vac on top, χ = 4.05 down to E_C, E_F ${eV(d)} below E_C, E_V 1.12 below E_C.\n\nFrom: §3`,
    ],
  };
};

// ---------------------------------------------------------------- Ch2 Q2: n-Si and p-Si before contact
G['08-contact#Q2'] = () => {
  const ND = pick(pow(15, 18)), NA = pick(pow(15, 18));
  const dn = KT * ln(NC / ND), dp = KT * ln(NC * NA / NI2);
  return {
    q: `Draw n-Si (N_D = ${f(ND)} cm⁻³) and p-Si (N_A = ${f(NA)} cm⁻³) on the same energy axes, **before** contact.\n\nFind E_C − E_F and φ for each side. χ = 4.05 eV.`,
    answers: [abs('n-Si: E_C − E_F', dn, 'eV', 0.02), abs('n-Si: φ', CHI + dn, 'eV', 0.02), abs('p-Si: E_C − E_F', dp, 'eV', 0.02), abs('p-Si: φ', CHI + dp, 'eV', 0.02)],
    steps: [
      `**n-Si:** E_C − E_F = 0.026 × ln(3.2 × 10¹⁹ ÷ ${f(ND)}) = **${eV(dn)} eV**\n\nφ = 4.05 + ${eV(dn)} = **${eV(CHI + dn)} eV**\n\nFrom: Topic 6 §3`,
      `**p-Si:** electrons are the minority, n = nᵢ² ÷ N_A.\n\nE_C − E_F = 0.026 × ln(3.2 × 10¹⁹ × ${f(NA)} ÷ 2.1 × 10²⁰) = **${eV(dp)} eV**\n\nφ = 4.05 + ${eV(dp)} = **${eV(CHI + dp)} eV**\n\nFrom: Topic 6 §3`,
      `**Draw:** one shared E_vac across the top. χ = 4.05 eV on both, so E_C lines up. E_F is high on the n side, low on the p side. They are **not** level yet, because they haven't touched.\n\nFrom: §2`,
    ],
  };
};

// ---------------------------------------------------------------- Ch2 Q5: symmetric diode at zero bias
G['10-pn-zero-bias#Q5'] = () => {
  const N = pick(pow(15, 18)), Eg = pick([1, 1.12]);
  const nCF = KT * ln(NC / N), FI = KT * ln(N / NI), pFV = KT * ln(NV / N), V0 = KT * ln(N * N / NI2);
  return {
    q: `Si np diode, no bias. N_A = N_D = ${f(N)} cm⁻³. E_G ≈ ${Eg} eV.\n\nSketch the band diagram. Find E_C − E_F and E_F − E_i on the n-side, E_F − E_V on the p-side, and V₀.`,
    answers: [abs('n-side: E_C − E_F', nCF, 'eV'), abs('n-side: E_F − E_i', FI, 'eV'), abs('p-side: E_F − E_V', pFV, 'eV'), abs('V₀', V0, 'V', 0.02)],
    steps: [
      `**n-side:**\n\nE_C − E_F = 0.026 × ln(3.2 × 10¹⁹ ÷ ${f(N)}) = **${eV(nCF)} eV**\n\nE_F − E_i = 0.026 × ln(${f(N)} ÷ 1.45 × 10¹⁰) = **${eV(FI)} eV**\n\nFrom: §5`,
      `**p-side:**\n\nE_F − E_V = 0.026 × ln(1.8 × 10¹⁹ ÷ ${f(N)}) = **${eV(pFV)} eV**\n\nE_i − E_F = ${eV(FI)} eV too (same doping).\n\nFrom: §5`,
      `**Built-in voltage:**\n\nV₀ = 0.026 × ln(N_A N_D ÷ nᵢ²) = 0.026 × ln(${f(N * N)} ÷ 2.1 × 10²⁰) = **${eV(V0)} V**\n\nCheck: ${eV(FI)} + ${eV(FI)} = ${eV(2 * FI)}. ✓\n\nFrom: §3, Equation 18`,
    ],
  };
};

// ---------------------------------------------------------------- Ch2 Q11a: built-in voltage
G['10-pn-zero-bias#Q11a'] = () => {
  const NA = pick(pow(15, 19)), ND = pick(pow(14, 18));
  const V0 = KT * ln(NA * ND / NI2);
  return {
    q: `pn diode, N_A = ${f(NA)} cm⁻³, N_D = ${f(ND)} cm⁻³, T = 300 K. Find V₀.`,
    answers: [abs('V₀', V0, 'V', 0.015)],
    steps: [`V₀ = 0.026 × ln(N_A N_D ÷ nᵢ²)\n\n= 0.026 × ln(${f(NA)} × ${f(ND)} ÷ 2.1 × 10²⁰)\n\n= 0.026 × ln(${f(NA * ND / NI2, 3)})\n\n= 0.026 × ${ln(NA * ND / NI2).toFixed(2)} = **${eV(V0)} V**\n\nFrom: §3, Equation 18`],
  };
};

// ---------------------------------------------------------------- shared short-diode setup for Ch2 Q9, Q10, Q12, Q13
function diode() {
  const NA = pick([1e15, 2e15, 5e15, 1e16, 1e17]), ND = pick([1e17, 5e17, 1e18, 2e18]);
  const Ln = pick([2e-3, 3e-3, 5e-3]), Lp = pick([4e-3, 6e-3, 8e-3]);
  const V = pick([0.4, 0.45, 0.5, 0.55, 0.6]);
  const np0 = NI2 / NA, pn0 = NI2 / ND, X = exp(V / KT);
  return { NA, ND, Ln, Lp, V, np0, pn0, X, npP: np0 * X, pnP: pn0 * X, Dn: 35, Dp: 12.5 };
}
const diodeText = d => `Short Si pn diode. N_A = ${f(d.NA)} cm⁻³, N_D = ${f(d.ND)} cm⁻³. p-region length L_n = ${f(d.Ln)} cm, n-region length L_p = ${f(d.Lp)} cm.`;
const injSteps = d => [
  `**Equilibrium minority carriers:**\n\nn_p0 = nᵢ² ÷ N_A = 2.1 × 10²⁰ ÷ ${f(d.NA)} = **${f(d.np0)} cm⁻³**\n\np_n0 = nᵢ² ÷ N_D = 2.1 × 10²⁰ ÷ ${f(d.ND)} = **${f(d.pn0)} cm⁻³**\n\nFrom: Topic 12 §1`,
  `**Boost factor at ${d.V} V:** e^(V/kT) = e^(${d.V}/0.026) = ${f(d.X, 3)}\n\nn'_p = ${f(d.np0)} × ${f(d.X, 3)} = **${f(d.npP)} cm⁻³**\n\np'_n = ${f(d.pn0)} × ${f(d.X, 3)} = **${f(d.pnP)} cm⁻³**\n\nFrom: Topic 12 §2`,
];

G['12-minority-injection#Q9'] = () => {
  const d = diode();
  return {
    q: `${diodeText(d)}\n\nFind the equilibrium minority concentrations, and the minority concentrations at the depletion edges for **${d.V} V forward**. Then sketch them.`,
    answers: [rel('n_p0', d.np0, 'cm⁻³'), rel('p_n0', d.pn0, 'cm⁻³'), rel("n'_p", d.npP, 'cm⁻³', 0.06), rel("p'_n", d.pnP, 'cm⁻³', 0.06)],
    steps: [...injSteps(d), `**Sketch:** each minority line drops in a **straight line** from its edge value down to equilibrium at the contact. Majority carriers stay flat at N_A and N_D.\n\nFrom: §3, §4`],
  };
};

G['12-minority-injection#Q10'] = () => {
  const d = diode();
  const Qp = E * 0.5 * d.pnP * d.Lp, Qn = E * 0.5 * d.npP * d.Ln;
  return {
    q: `${diodeText(d)}\n\nAt **${d.V} V forward**, find the excess minority charge per area in each region.`,
    answers: [rel("p'_n", d.pnP, 'cm⁻³', 0.06), rel("n'_p", d.npP, 'cm⁻³', 0.06), rel('Q_p (n-region)', Qp, 'C/cm²', 0.07), rel('Q_n (p-region)', Qn, 'C/cm²', 0.07)],
    steps: [...injSteps(d), `**Triangle area:** Q = e × ½ × height × length.\n\nQ_p = 1.6 × 10⁻¹⁹ × ½ × ${f(d.pnP)} × ${f(d.Lp)} = **${f(Qp)} C/cm²**\n\nQ_n = 1.6 × 10⁻¹⁹ × ½ × ${f(d.npP)} × ${f(d.Ln)} = **${f(Qn)} C/cm²**\n\nFrom: §7, Equation 20`],
  };
};

G['13-diode-current#Q12'] = () => {
  const d = diode();
  const Jn = E * d.Dn * d.npP / d.Ln, Jp = E * d.Dp * d.pnP / d.Lp;
  return {
    q: `${diodeText(d)} Bias **${d.V} V forward**. D_n = 35 cm²/s, D_p = 12.5 cm²/s.\n\nFind J_n, J_p and the total. Which is bigger, and why?`,
    answers: [rel('J_n', Jn, 'A/cm²', 0.06), rel('J_p', Jp, 'A/cm²', 0.06), rel('J total', Jn + Jp, 'A/cm²', 0.06)],
    steps: [...injSteps(d),
      `**Currents** (straight-line slope = edge value ÷ length):\n\nJ_n = e D_n n'_p ÷ L_n = 1.6 × 10⁻¹⁹ × 35 × ${f(d.npP)} ÷ ${f(d.Ln)} = **${f(Jn)} A/cm²**\n\nJ_p = e D_p p'_n ÷ L_p = 1.6 × 10⁻¹⁹ × 12.5 × ${f(d.pnP)} ÷ ${f(d.Lp)} = **${f(Jp)} A/cm²**\n\nFrom: §2`,
      `**Total:** J = J_n + J_p = **${f(Jn + Jp)} A/cm²**\n\n**Why ${Jn > Jp ? 'J_n' : 'J_p'} is bigger:** ${d.NA < d.ND ? 'N_A < N_D, so the p-side is lighter. More electrons get injected into it.' : 'the lighter side gets more injection.'}\n\nFrom: §3, §5`],
  };
};

G['13-diode-current#Q13'] = () => {
  const d = diode();
  const Jn = E * d.Dn * d.npP / d.Ln, Jp = E * d.Dp * d.pnP / d.Lp;
  const halveN = Math.random() < 0.5;
  const Jn2 = halveN ? Jn : 2 * Jn, Jp2 = halveN ? 2 * Jp : Jp;
  return {
    q: `${diodeText(d)} Bias **${d.V} V forward**. D_n = 35, D_p = 12.5 cm²/s.\n\nThe **${halveN ? 'n' : 'p'}-region** is made half as long. Find the new J_n, J_p and total. What changes?`,
    answers: [rel('new J_n', Jn2, 'A/cm²', 0.06), rel('new J_p', Jp2, 'A/cm²', 0.06), rel('new total', Jn2 + Jp2, 'A/cm²', 0.06)],
    steps: [...injSteps(d),
      `**Before:** J_n = ${f(Jn)}, J_p = ${f(Jp)} A/cm².\n\nFrom: §2`,
      `**Halving the ${halveN ? 'n-region' : 'p-region'}** doubles the slope there. That region carries the **${halveN ? 'hole' : 'electron'}** current, so ${halveN ? 'J_p' : 'J_n'} doubles.\n\nNew J_n = **${f(Jn2)}**, new J_p = **${f(Jp2)}**, total = **${f(Jn2 + Jp2)} A/cm²**\n\n${(halveN ? Jp < Jn : Jn < Jp) ? 'The doubled part was the small one, so the total barely changes.' : 'The doubled part was the big one, so the total nearly doubles.'}\n\nFrom: §6`],
  };
};

// ---------------------------------------------------------------- Ch2 Q11: depletion widths, charge, field
G['14-depletion-width#Q11'] = () => {
  const NA = pick([1e18, 5e18, 1e19]), ND = pick([1e15, 5e15, 1e16, 5e16]), dia = pick([50, 100, 200]);
  const V0 = KT * ln(NA * ND / NI2), eps = EPS0 * ER;
  const wn = Math.sqrt(2 * eps * V0 / E * NA / (ND * (NA + ND))), wp = wn * ND / NA;
  const r = dia / 2 * 1e-4, A = Math.PI * r * r, Q = E * ND * wn * A, Emax = E * ND * wn / eps;
  return {
    q: `pn diode, diameter ${dia} µm. N_A = ${f(NA)}, N_D = ${f(ND)} cm⁻³. T = 300 K. ε_r = 11.9.\n\nFind:\na. V₀\nb. w_n and w_p\nc. why one side is wider\nd. the charge Q on each side\ne. the peak electric field`,
    answers: [abs('V₀', V0, 'V', 0.015), rel('w_n', wn, 'cm', 0.05), rel('w_p', wp, 'cm', 0.05), rel('|Q|', Q, 'C', 0.07), rel('|ℰ₀|', Emax, 'V/cm', 0.06)],
    steps: [
      `**a.** V₀ = 0.026 × ln(${f(NA)} × ${f(ND)} ÷ 2.1 × 10²⁰) = **${eV(V0)} V**\n\nFrom: Topic 10 Equation 18`,
      `**b.** ε = 8.85 × 10⁻¹⁴ × 11.9 = ${f(eps, 3)} F/cm. N_A ≫ N_D, so use the shortcut:\n\nw_n ≈ √(2ε V₀ ÷ (e N_D)) = √(2 × ${f(eps, 3)} × ${eV(V0)} ÷ (1.6 × 10⁻¹⁹ × ${f(ND)})) = **${f(wn)} cm**\n\nw_p = w_n × N_D ÷ N_A = **${f(wp)} cm**\n\nFrom: §3, Equation 24`,
      `**c.** Charge balance: N_A w_p = N_D w_n. N_A ≫ N_D, so w_n ≫ w_p. The light side is wider.\n\nFrom: §3`,
      `**d.** A = π r² = π × (${f(r)})² = ${f(A, 3)} cm²\n\nQ = e N_D w_n A = 1.6 × 10⁻¹⁹ × ${f(ND)} × ${f(wn)} × ${f(A, 3)} = **${f(Q)} C**\n\n+Q on the n-side, −Q on the p-side.\n\nFrom: §5`,
      `**e.** ℰ₀ = −e N_D w_n ÷ ε = −1.6 × 10⁻¹⁹ × ${f(ND)} × ${f(wn)} ÷ ${f(eps, 3)} = **−${f(Emax)} V/cm**\n\nFrom: §4`,
    ],
  };
};

window.SCRAMBLE = G;
window.SCRAMBLE_FMT = f;
})();
