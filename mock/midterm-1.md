# Mock Midterm 1

**Covers:** Chapter 1 + Chapter 2. Every question is built on a tutorial question (shown in brackets), with new numbers or a twist.

**How to use it:**
- Do it on paper, closed book, with only the [formula sheet](../formula-sheet.md).
- Aim for about 50 minutes. (That's a guess. Check the real length with your lecturer.)
- Mark yourself with the answers at the bottom. Each answer says which notes section to go back to.

**Constants (Si, 300 K):** nᵢ = 1.45 × 10¹⁰ cm⁻³. kT = 0.026 eV. e = 1.6 × 10⁻¹⁹ C. N_C = 3.2 × 10¹⁹ cm⁻³. N_V = 1.8 × 10¹⁹ cm⁻³. E_G = 1.12 eV. χ = 4.05 eV. ε₀ = 8.85 × 10⁻¹⁴ F/cm. ε_r = 11.9.

---

## Questions

### Q1. Doping (Ch1 Q2, Q4, Q5) — 15 marks

a. Draw the 2D bond model of Si doped with **arsenic**. Show the dopant atom, the free carrier, and the charge on the ion. (4)

b. Write down the law of mass action and the charge neutrality equation. (3)

c. Si is doped with boron at **2 × 10¹⁶ cm⁻³**. Find n and p at room temperature. Which is the majority carrier? (4)

d. Si is doped with **10²³ m⁻³** of phosphorus. Find n and p. (4)

---

### Q2. Drift (Ch1 Q6, Q7) — 15 marks

a. Explain why mobility falls as doping increases. (3)

b. An n-type Si bar has N_D = 10¹⁶ cm⁻³ and μₙ = 1200 cm²/Vs. Find the conductivity and the resistivity. (4)

c. The bar is 1 mm long with a 100 µm × 100 µm cross-section. Find its resistance. (4)

d. Find the electron diffusion constant D_n using the Einstein relation. (4)

---

### Q3. Bands, Fermi level and workfunction (Ch1 Q10–Q16, Ch2 Q1) — 20 marks

a. What is the probability that a state **0.1 eV above** E_F is occupied at 300 K? (4)

b. Si is doped with N_D = 5 × 10¹⁶ cm⁻³. Find E_C − E_F. (4)

c. Find the workfunction φ of this sample. (3)

d. Sketch its band diagram with respect to the vacuum level. Label E_vac, E_C, E_F, E_V, χ, φ. (5)

e. Without calculating, say whether p-type Si would have a larger or smaller φ, and why. (4)

---

### Q4. Metal–semiconductor contact (Ch2 Q6) — 15 marks

A metal with workfunction φₘ is put on **n-type** Si with workfunction φₛ, where **φₘ < φₛ**.

a. Which way do electrons flow when they first make contact? (2)

b. Draw the band diagram at V = 0, before and after contact. (5)

c. Is this an ohmic or a Schottky contact? Explain using the majority carrier concentration at the interface. (4)

d. Sketch the I–V characteristic. What would change if φₘ > φₛ? (4)

---

### Q5. pn diode (Ch2 Q5, Q7–Q13) — 35 marks

A short Si pn diode has N_A = 10¹⁸ cm⁻³ and N_D = 10¹⁶ cm⁻³.
p-region length: 3 × 10⁻³ cm. n-region length: 4 × 10⁻³ cm.
D_n = 35 cm²/s. D_p = 12.5 cm²/s.

a. Find the built-in voltage V₀. (3)

b. Sketch the band diagram at zero bias. Label E_C, E_V, E_F and eV₀. (5)

c. Find w_n and w_p at zero bias. Which side is wider, and why? (6)

d. Find the peak electric field at zero bias. (3)

e. A forward bias of 0.6 V is applied. Find p'_n and n'_p at the edges of the depletion region. (4)

f. Sketch the minority carrier profiles on both sides for this forward bias. (4)

g. Find J_p, J_n and the total current density. Which dominates, and why? (6)

h. Explain why the reverse current of this diode is small. (4)

---

---

## Answers

<details><summary>Q1 answers</summary>

**a.** Si grid with 4 bonds per atom. One Si swapped for **As** (group V, 5 outer electrons). 4 electrons bond. The 5th is drawn loose as a **free electron (−)**. The As is a fixed **As⁺** ion.
→ Topic 1 §6, Topic 2 §1

**b.**

$$n \times p = n_i^2 \qquad\qquad p + N_D^+ = n + N_A^-$$

→ Topic 1 §5, Topic 2 §2

**c.** Boron = acceptor = p-type. **p = N_A = 2 × 10¹⁶ cm⁻³**. n = 2.1 × 10²⁰ ÷ 2 × 10¹⁶ = **1.05 × 10⁴ cm⁻³**. Holes are the majority.
→ Topic 2 §3, Equation 5

**d.** Convert: 10²³ m⁻³ ÷ 10⁶ = **10¹⁷ cm⁻³**. P = donor. **n = 10¹⁷ cm⁻³**. p = 2.1 × 10²⁰ ÷ 10¹⁷ = **2.1 × 10³ cm⁻³**.
→ Topic 2 §3, §6 (units trap)

</details>

<details><summary>Q2 answers</summary>

**a.** μ = eτ/m. Dopant ions break up the regular lattice and scatter carriers. More dopants = more scattering = shorter τ = lower μ.
→ Topic 3, Q6

**b.** n-type, so shortcut: σ ≈ e n μₙ = 1.6 × 10⁻¹⁹ × 10¹⁶ × 1200 = **1.92 (Ω·cm)⁻¹**. ρ = 1/σ = **0.52 Ω·cm**.
→ Topic 3 Equation 8, 9

**c.** L = 0.1 cm. A = 0.01 × 0.01 = 10⁻⁴ cm². R = L/(σA) = 0.1 ÷ (1.92 × 10⁻⁴) = **520 Ω**.
→ Topic 3 Equation 9 (convert to cm first)

**d.** D_n = (kT/e) μₙ = 0.026 × 1200 = **31 cm²/s**.
→ Topic 4 Equation 12

</details>

<details><summary>Q3 answers</summary>

**a.** f = 1 ÷ (1 + e^(0.1/0.026)) = 1 ÷ (1 + 46.8) = **0.021**, about 2%.
→ Topic 5 §4, Equation 13

**b.** E_C − E_F = 0.026 × ln(3.2 × 10¹⁹ ÷ 5 × 10¹⁶) = 0.026 × ln(640) = **0.17 eV**.
→ Topic 5 §6

**c.** φ = χ + (E_C − E_F) = 4.05 + 0.17 = **4.22 eV**.
→ Topic 6 Equation 16

**d.** E_vac at the top. χ = 4.05 down to E_C. E_F 0.17 below E_C (close, n-type). E_V 1.12 below E_C. φ = 4.22 arrow from E_vac to E_F.
→ Topic 6 drawing checklist, compare the Ch2 Q1 official answer

**e.** **Larger.** In p-type, E_F sits near E_V, further below E_vac. φ is measured to E_F, so it's bigger. χ doesn't change.
→ Topic 6 §1

</details>

<details><summary>Q4 answers</summary>

**a.** φₘ < φₛ means the metal's E_F is **higher**. Electrons flow **metal → Si**.
→ Topic 9 §2

**b.** Before: metal E_F higher than Si E_F, against a common E_vac. After: E_F flat. The Si bands bend **down** towards the metal (E_C comes closer to E_F at the junction). Flat far from the junction.
→ Topic 9 §3, drawing checklist

**c.** **Ohmic.** The Si gains electrons at the interface. Electrons are the majority in n-Si, so the majority carrier concentration **increases** at the junction. No barrier.
→ Topic 9 §2

**d.** Straight line through the origin (V = IR). If φₘ > φₛ: electrons leave the Si, the bands bend up, a barrier forms. **Schottky**, a one-way diode curve.
→ Topic 9 §1, §6 (this is the Ch2 Q6e twist)

</details>

<details><summary>Q5 answers</summary>

**a.** V₀ = 0.026 × ln(10¹⁸ × 10¹⁶ ÷ 2.1 × 10²⁰) = 0.026 × 31.5 = **0.82 V**.
→ Topic 10 Equation 18

**b.** Flat E_F. p-side: E_F just above E_V. n-side: E_F about 0.2 eV below E_C. p-side bands higher, S-bend in the depletion region. Step labelled eV₀ = 0.82 eV.
→ Topic 10 drawing checklist

**c.** N_A ≫ N_D, so w_n ≈ √(2εV₀ / eN_D):

w_n = √(2 × 8.85 × 10⁻¹⁴ × 11.9 × 0.82 ÷ (1.6 × 10⁻¹⁹ × 10¹⁶)) = **3.3 × 10⁻⁵ cm**

w_p = w_n × N_D/N_A = **3.3 × 10⁻⁷ cm**

n-side is 100× wider. Charge balance N_A w_p = N_D w_n: the lightly doped side is wider.
→ Topic 14 Equations 23, 24

**d.** ℰ₀ = −eN_D w_n / ε = −1.6 × 10⁻¹⁹ × 10¹⁶ × 3.3 × 10⁻⁵ ÷ 1.05 × 10⁻¹² = **−5.0 × 10⁴ V/cm**.
→ Topic 14 Equation 25

**e.** p_n0 = 2.1 × 10²⁰ ÷ 10¹⁶ = 2.1 × 10⁴. n_p0 = 2.1 × 10²⁰ ÷ 10¹⁸ = 210. e^(0.6/0.026) = 1.05 × 10¹⁰.

p'_n = **2.2 × 10¹⁴ cm⁻³**. n'_p = **2.2 × 10¹² cm⁻³**.
→ Topic 12 Equation 19

**f.** n-side: holes start at 2.2 × 10¹⁴ at the depletion edge, straight line down to 2.1 × 10⁴ at the contact. p-side: electrons start at 2.2 × 10¹², straight line down to 210 at the contact. Majority carriers flat at 10¹⁸ and 10¹⁶.
→ Topic 12 drawing checklist

**g.** J_p ≈ e D_p p'_n / L = 1.6 × 10⁻¹⁹ × 12.5 × 2.2 × 10¹⁴ ÷ 4 × 10⁻³ = **0.11 A/cm²**

J_n ≈ e D_n n'_p / L = 1.6 × 10⁻¹⁹ × 35 × 2.2 × 10¹² ÷ 3 × 10⁻³ = **4.1 × 10⁻³ A/cm²**

Total ≈ **0.11 A/cm²**. **Holes dominate**, because the n-side is lightly doped, so it gets 100× more minority injection.
→ Topic 13 Equation 21, §5

**h.** Reverse bias raises the barrier, so majority diffusion stops. Only minority carriers are swept across by drift. There are only nᵢ²/N of them, so very few. The current is tiny and flat (−I₀).
→ Topic 11 §7, Topic 13 §4

</details>
