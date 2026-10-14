# Mock Midterm 2

**Covers:** Chapter 1 + Chapter 2. Every question is built on a tutorial question (shown in brackets), with new numbers or a twist. More "explain" and "sketch" than Mock 1.

**How to use it:**
- Do it on paper, closed book, with only the [formula sheet](../formula-sheet.md).
- Aim for about 50 minutes. (That's a guess. Check the real length with your lecturer.)
- Mark yourself with the answers at the bottom.

**Constants (Si, 300 K):** nᵢ = 1.45 × 10¹⁰ cm⁻³. kT = 0.026 eV. e = 1.6 × 10⁻¹⁹ C. N_C = 3.2 × 10¹⁹ cm⁻³. N_V = 1.8 × 10¹⁹ cm⁻³. E_G = 1.12 eV. χ = 4.05 eV. ε₀ = 8.85 × 10⁻¹⁴ F/cm. ε_r = 11.9.

---

## Questions

### Q1. Carriers (Ch1 Q1, Q3, Q4, Q5) — 15 marks

a. Using the bond model, explain what a hole is. Why is it **not** a missing atom? (3)

b. Explain why the resistance of pure Si **falls** as temperature rises, while a metal's resistance rises. (4)

c. A Si sample has N_D = 5 × 10¹⁶ cm⁻³ **and** N_A = 2 × 10¹⁶ cm⁻³. Is it n-type or p-type? Find n and p. (5)

d. Write charge neutrality for this sample. (3)

---

### Q2. Diffusion (Ch1 Q8, Q9) — 15 marks

a. In a short n-type Si sample, the excess hole concentration falls linearly from **10¹⁵ cm⁻³** at x = 0 to **0** at x = 10 µm. D_p = 12.5 cm²/s. Find the hole diffusion current density and give its direction. (6)

b. The same calculation for electrons, D_n = 35 cm²/s, with the same profile. Which way does the electron **current** flow? (4)

c. An n-type sample has doping that **decreases** from left to right. With no external voltage, explain why an electric field appears and say which way it points. (5)

---

### Q3. Workfunction and bands under a field (Ch1 Q16–Q18) — 20 marks

a. A Si sample has φ = **4.9 eV**. Sketch the band diagram with E_vac, then decide whether it's n-type or p-type. (5)

b. Find the doping concentration of this sample. (5)

c. A uniform p-Si bar has **3 V** across it, + on the right, − on the left. Sketch the band diagram. Mark the field direction, the size of the energy drop, and which way holes and electrons move. (6)

d. Where do higher-energy holes sit on a band diagram? (4)

---

### Q4. Junction formation (Ch2 Q2–Q5, Q11) — 25 marks

n-Si (N_D = 10¹⁷ cm⁻³) and p-Si (N_A = 10¹⁶ cm⁻³) are joined. The diode has a diameter of 200 µm.

a. Find the workfunction of each side. Sketch both on the same axes **before** contact. (6)

b. Which way do electrons flow on contact? Explain why the Fermi levels end up aligned. (4)

c. Find V₀. (3)

d. Find w_n and w_p at zero bias. (5)

e. Find the charge on each side of the depletion region. (3)

f. Find the peak electric field. (4)

---

### Q5. Diode under bias (Ch2 Q7–Q10, Q12, Q13) — 25 marks

A short Si diode has N_A = 10¹⁶ cm⁻³, N_D = 10¹⁸ cm⁻³.
p-region length: 4 × 10⁻³ cm. n-region length: 6 × 10⁻³ cm.
D_n = 35 cm²/s. D_p = 12 cm²/s.

a. On a schematic of the diode, draw the direction of electron and hole flow across the junction under forward bias. (3)

b. At 0.55 V forward, find n'_p and p'_n. (4)

c. Find the excess electron charge per area in the p-region. (4)

d. Find J_n and J_p. Give the total. (6)

e. The **p-region** is halved in length. What happens to the total current? (4)

f. Sketch the minority carrier profiles at **2 V reverse** bias. (4)

---

---

## Answers

<details><summary>Q1 answers</summary>

**a.** A hole is a **missing bond electron**. A neighbouring bond electron can hop into the gap, which moves the gap the other way. That acts like a moving + charge. The Si atom itself is still there and still in place.
→ Topic 1 §3–§4

**b.** Pure Si: heat breaks more bonds, so more electron–hole pairs (nᵢ rises fast). More carriers = lower R. Metal: the number of free electrons is fixed. Heat makes the lattice vibrate more, so more scattering, lower mobility, higher R.
→ Topic 1, Q3 (and your questions log)

**c.** N_D > N_A, so **n-type**. Compensation: n ≈ N_D − N_A = **3 × 10¹⁶ cm⁻³**. p = 2.1 × 10²⁰ ÷ 3 × 10¹⁶ = **7 × 10³ cm⁻³**.
→ Topic 2 §7

**d.** Both dopants present, so keep everything: **p + N_D = n + N_A**.
→ Topic 2 §2

</details>

<details><summary>Q2 answers</summary>

**a.** Gradient = 10¹⁵ ÷ 10⁻³ cm = 10¹⁸ cm⁻⁴ (falling).

|J_p| = e D_p × gradient = 1.6 × 10⁻¹⁹ × 12.5 × 10¹⁸ = **2.0 A/cm²**

Holes diffuse from high to low concentration: **+x**. They're positive, so the current is also **+x**.
→ Topic 4 Equation 11

**b.** |J_n| = 1.6 × 10⁻¹⁹ × 35 × 10¹⁸ = **5.6 A/cm²**. Electrons diffuse +x, but they're negative, so the current flows **−x**.
→ Topic 4 Equation 11

**c.** More electrons on the left, so they diffuse right. That leaves fixed + donor ions behind on the left and puts extra − charge on the right. This sets up a field pointing **left to right** (+ to −), which drifts electrons back to the left until drift = diffusion.
→ Topic 4 (built-in field), Q9

</details>

<details><summary>Q3 answers</summary>

**a.** E_vac, then E_C at 4.05 below, midgap at 4.05 + 0.56 = 4.61 below. φ = 4.9 is **below midgap**, so E_F is in the lower half: **p-type**.
→ Topic 6, Ch1 Q16 method

**b.** E_F − E_V = (χ + E_G) − φ = 5.17 − 4.9 = **0.27 eV**.

p = N_V e^(−0.27/0.026) = 1.8 × 10¹⁹ × 3.1 × 10⁻⁵ = **5.6 × 10¹⁴ cm⁻³**. So N_A ≈ **5.6 × 10¹⁴ cm⁻³**.
→ Topic 5 Equation 14, Topic 6

**c.** Field points from + to −: **right to left**. Bands are higher at the − end, so **higher on the left**, tilting down to the right. Drop across the bar = **3 eV**. E_F near E_V, parallel. Electrons roll downhill: **left to right**. Holes float uphill: **right to left**.
→ Topic 7 drawing checklist, Ch1 Q18

**d.** **Deeper** in the valence band, further below E_V. Hole energy is upside down.
→ Topic 7 §1, Ch1 Q17

</details>

<details><summary>Q4 answers</summary>

**a.** n-side: E_C − E_F = 0.026 × ln(3.2 × 10¹⁹ ÷ 10¹⁷) = 0.15 eV. **φₙ = 4.20 eV**.

p-side: E_F − E_V = 0.026 × ln(1.8 × 10¹⁹ ÷ 10¹⁶) = 0.19 eV, so E_C − E_F = 1.12 − 0.19 = 0.93 eV. **φₚ = 4.98 eV**.

Sketch: common E_vac, E_C and E_V at the same heights on both sides, E_F higher on the n-side.
→ Topic 6 §2, Topic 8 §2, Ch2 Q2

**b.** From the n-side (higher E_F) to the p-side (lower E_F). Electrons from the n-side drop into empty lower states on the p-side until no filled state sits above an empty one. That happens when the Fermi levels are level.
→ Topic 8 §3, Ch2 Q3

**c.** V₀ = 0.026 × ln(10¹⁷ × 10¹⁶ ÷ 2.1 × 10²⁰) = **0.76 V**.

(The difference in φ gives 0.78 V. Small rounding difference, both fine.)
→ Topic 10 Equation 18

**d.** Formula sheet:

w_p = √(2 × 1.05 × 10⁻¹² × 0.76 ÷ 1.6 × 10⁻¹⁹ × 10¹⁷ ÷ (10¹⁶ × 1.1 × 10¹⁷)) = **3.0 × 10⁻⁵ cm**

w_n = w_p × N_A/N_D = **3.0 × 10⁻⁶ cm**

This time the **p-side** is wider (it's the lightly doped one).
→ Topic 14 Equation 24, 23

**e.** A = π × (100 × 10⁻⁴)² = 3.14 × 10⁻⁴ cm².

Q = eN_A w_p A = 1.6 × 10⁻¹⁹ × 10¹⁶ × 3.0 × 10⁻⁵ × 3.14 × 10⁻⁴ = **1.5 × 10⁻¹¹ C**. +1.5 × 10⁻¹¹ C on the n-side, −1.5 × 10⁻¹¹ C on the p-side.
→ Topic 14 Equation 26

**f.** ℰ₀ = −eN_A w_p / ε = −1.6 × 10⁻¹⁹ × 10¹⁶ × 3.0 × 10⁻⁵ ÷ 1.05 × 10⁻¹² = **−4.6 × 10⁴ V/cm**.
→ Topic 14 Equation 25

</details>

<details><summary>Q5 answers</summary>

**a.** Electrons n → p. Holes p → n. Both by diffusion over the lowered barrier.
→ Topic 11 §6, Ch2 Q7

**b.** n_p0 = 2.1 × 10²⁰ ÷ 10¹⁶ = 2.1 × 10⁴. p_n0 = 2.1 × 10²⁰ ÷ 10¹⁸ = 210. e^(0.55/0.026) = 1.5 × 10⁹.

n'_p = **3.2 × 10¹³ cm⁻³**. p'_n = **3.2 × 10¹¹ cm⁻³**.
→ Topic 12 Equation 19

**c.** Q_n = e × ½ × n'_p × L = 1.6 × 10⁻¹⁹ × ½ × 3.2 × 10¹³ × 4 × 10⁻³ = **1.0 × 10⁻⁸ C/cm²**.
→ Topic 12 Equation 20, Ch2 Q10

**d.** J_n = 1.6 × 10⁻¹⁹ × 35 × 3.2 × 10¹³ ÷ 4 × 10⁻³ = **4.5 × 10⁻² A/cm²**

J_p = 1.6 × 10⁻¹⁹ × 12 × 3.2 × 10¹¹ ÷ 6 × 10⁻³ = **1.0 × 10⁻⁴ A/cm²**

Total ≈ J_n = **4.5 × 10⁻² A/cm²**.
→ Topic 13 Equation 21, Ch2 Q12

**e.** The p-region carries the **electron** current, which is the one that dominates. Half the length = double the gradient, so J_n doubles. Total **roughly doubles**, to about 9 × 10⁻² A/cm².

This is the opposite of Ch2 Q13, where they halved the side that didn't matter.
→ Topic 13 §6

**f.** e^(−2/0.026) ≈ 0. Minority concentration ≈ **0** at both depletion edges, rising in straight lines to n_p0 = 2.1 × 10⁴ and p_n0 = 210 at the contacts. Majority flat.
→ Topic 12 §5, Ch2 Q9c

</details>
