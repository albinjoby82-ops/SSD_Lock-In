# Formula sheet

This is copied from page 1 of the Ch1 tutorial.

The exam gives you a "detailed formula sheet".
This is probably the same one, or very close to it.

**You look these up. You don't memorise them.**

Except the ones in the next section.

---

## Learn by heart (NOT on the sheet)

In topic order. Each one links to the notes where it is explained.

<br>

**Law of mass action** (Topic 1)

$$n \times p = n_i^2$$

See [Topic 1, §5](notes/01-bond-model.md).

<br>

**Charge neutrality** (Topic 2)

$$p + N_D^+ = n + N_A^-$$

See [Topic 2, §2](notes/02-doping-carrier-concentration.md).

<br>

**Drift velocity** (Topic 3)

$$v = \mu E$$

See [Topic 3, §3](notes/03-drift.md).

<br>

**Conductivity** (Topic 3). Also learn how to derive it.

$$\sigma = e\,(n\,\mu_n + p\,\mu_p)$$

See [Topic 3, §6](notes/03-drift.md).

<br>

**Resistivity** (Topic 3). The flip of conductivity, in Ω·cm.

$$\rho = \frac{1}{\sigma}$$

See [Topic 3, §6](notes/03-drift.md).

<br>

**Resistance** (Topic 3). Convert L and A to cm first.

$$R = \frac{L}{\sigma A}$$

See [Topic 3, §6](notes/03-drift.md).

<br>

**Diffusion current** (Topic 4)

$$J_n = e\,D_n\,\frac{dn}{dx} \qquad\qquad J_p = -\,e\,D_p\,\frac{dp}{dx}$$

See [Topic 4, §2](notes/04-diffusion.md).

<br>

**Built-in field from uneven doping** (Topic 4). Also learn how to derive it.

$$E = -\frac{kT}{e}\,\frac{1}{n}\,\frac{dn}{dx}$$

Set $J_n = 0$, rearrange for $E$, then use the Einstein relation. E points towards low doping. See [Topic 4, §7](notes/04-diffusion.md).

---

## Constants

In the order you'll meet them.

| Symbol | What it is | Value |
|---|---|---|
| $n_i$ | carriers in pure Si, 300 K | 1.45 × 10¹⁰ cm⁻³ |
| $e$ | charge of an electron | 1.6 × 10⁻¹⁹ C |
| $kT/e$ | thermal voltage, 300 K | 0.026 V |
| $E_G$ | bandgap of Si, 300 K | 1.12 eV |
| $N_C$ | effective density of states, conduction band | 3.2 × 10¹⁹ cm⁻³ |
| $N_V$ | effective density of states, valence band | 1.8 × 10¹⁹ cm⁻³ |
| $\varepsilon_0$ | permittivity of free space | 8.85 × 10⁻¹² F/m |
| $\varepsilon_{Si}$ | dielectric constant of Si | 11 |
| $\varepsilon_{ox}$ | dielectric constant of SiO₂ | 4 |
| $h$ | Planck's constant | 6.63 × 10⁻³⁴ Js |
| $\mu_0$ | permeability of free space | 4π × 10⁻⁷ H/m |

---

## Formulae (on the sheet)

In topic order. Each one gets explained in the topic where we first use it.

<br>

**Drift and diffusion current** (Topics 3 and 4)

$$J_n = e\mu_n n E + eD_n \frac{dn}{dx}$$

$$J_p = e\mu_p p E - eD_p \frac{dp}{dx}$$

<br>

**Einstein relation** (Topic 4)

$$D = \frac{kT}{e}\,\mu$$

<br>

**Poisson equation** (Topics 4 and 14)

$$\frac{dE}{dx} = \frac{\rho(x)}{\varepsilon}$$

<br>

**Fermi distribution** (Topic 5)

$$f(E) = \frac{1}{1 + e^{(E - E_F)/kT}}$$

<br>

**Intrinsic carrier concentration** (Topic 5)

$$n_i = \sqrt{N_C N_V}\; e^{-E_G / 2kT}$$

<br>

**Electron and hole concentration** (Topic 5)

$$n = N_C\, e^{-(E_C - E_F)/kT} \qquad p = N_V\, e^{(E_V - E_F)/kT}$$

<br>

**Built-in voltage** (Topic 10)

$$V_{bi} = \frac{kT}{e}\ln\left(\frac{N_A N_D}{n_i^2}\right)$$

<br>

**Minority carrier injection under bias V** (Topic 12)

$$c = c_0\, e^{eV/kT}$$

<br>

**pn-junction current densities** (Topic 13)

$$J_n = \frac{eD_n n_{p0}}{L_n}\left(e^{eV/kT} - 1\right) \qquad J_p = \frac{eD_p p_{n0}}{L_p}\left(e^{eV/kT} - 1\right)$$

<br>

**Depletion widths under bias V** (Topic 14)

$$w_n = \left[\frac{2\varepsilon (V_{bi} - V) N_A}{e (N_A + N_D) N_D}\right]^{1/2} \qquad w_p = \left[\frac{2\varepsilon (V_{bi} - V) N_D}{e (N_A + N_D) N_A}\right]^{1/2}$$

<br>

**Not in Ch1–2 (later chapters):** MOSFET current, maximum depletion width.
