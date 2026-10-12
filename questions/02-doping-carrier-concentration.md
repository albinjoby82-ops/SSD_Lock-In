# Topic 2 — End-of-topic test

Try each question first.
Then click to check.

Each answer says which notes section (§) it comes from.

nᵢ = 1.45 × 10¹⁰ cm⁻³ and nᵢ² ≈ 2.1 × 10²⁰ cm⁻⁶ (Si, 300 K).

---

## Part A: Tutorial questions

### Q4 (Tutorial Ch1 Q4)

1. Write the law of mass action.
2. Write charge neutrality.
3. Derive the electron and hole concentrations in p-type Si.

<details><summary>Answer</summary>

**1. Mass action:**

$$n \times p = n_i^2$$

**2. Charge neutrality:**

$$-n + p + N_D^+ - N_A^- = 0$$

**3. Derivation:**
Follow the 7 steps in §5 of the notes.

The short version:

p-type, so N_D = 0:
p = n + N_A

Swap n = nᵢ² ÷ p, then solve the quadratic:

$$p = \frac{N_A + \sqrt{N_A^2 + 4n_i^2}}{2}$$

N_A ≫ nᵢ, so:

$$p \approx N_A \qquad n = \frac{n_i^2}{N_A}$$

From: §2, §5

</details>

---

### Q5 (Tutorial Ch1 Q5)

Find the hole and electron concentrations at room temperature for:

1. Intrinsic silicon
2. Boron-doped silicon, [B] = 10¹⁹ cm⁻³
3. Phosphorus-doped silicon, [P] = 10²⁴ m⁻³

<details><summary>Answer</summary>

**1. Intrinsic:**

n = p = nᵢ = **1.45 × 10¹⁰ cm⁻³**

From: Topic 1 §5

<br>

**2. Boron, so p-type:**

p = N_A = **10¹⁹ cm⁻³**

n = nᵢ² ÷ N_A

n = 2.1 × 10²⁰ ÷ 10¹⁹

n = **21 cm⁻³**

From: §3, Equation 5

<br>

**3. Phosphorus, so n-type.**

First convert units:

10²⁴ m⁻³ ÷ 10⁶ = 10¹⁸ cm⁻³

n = N_D = **10¹⁸ cm⁻³**

p = nᵢ² ÷ N_D

p = 2.1 × 10²⁰ ÷ 10¹⁸

p = **210 cm⁻³**

From: §3 Equation 4, §6

These match the official answers.

</details>

---

## Part B: Midterm-style questions

---

### M1: True or false

1. Donor ions carry current.
2. In p-type Si, electrons are the minority carrier.
3. Doping Si with As makes the holes the majority carrier.
4. Charge neutrality is given on the formula sheet.
5. n × p = nᵢ² still works in doped Si.

<details><summary>Answer</summary>

1. **False.** Ions are fixed in the lattice. (§1)
2. **True.** (§3)
3. **False.** As is group V, a donor. Electrons are the majority. (§3, Topic 1 §6)
4. **False.** Learn it by heart. (§2)
5. **True.** It works in equilibrium, doped or not. (Topic 1 §5)

</details>

---

### M2: Multiple choice

Si is doped with N_A = 10¹⁷ cm⁻³ of boron.
The electron concentration is about:

- A. 10¹⁷ cm⁻³
- B. 1.45 × 10¹⁰ cm⁻³
- C. 2.1 × 10³ cm⁻³
- D. 2.1 × 10²⁰ cm⁻³

<details><summary>Answer</summary>

**C.**

Boron, so p-type. Electrons are the minority.

n = nᵢ² ÷ N_A

n = 2.1 × 10²⁰ ÷ 10¹⁷

n = 2.1 × 10³ cm⁻³

A is the hole concentration. B is intrinsic. D is nᵢ².

From: §3, Equation 5

</details>

---

### M3: Reverse question (from the slides)

You need an electron concentration of n = 10¹⁸ cm⁻³.

1. What should you dope Si with, and how much?
2. How many holes will there be?

<details><summary>Answer</summary>

**1.**
You need electrons, so use donors: atoms with 5 outer electrons, like P.

n = N_D, so N_D = **10¹⁸ cm⁻³**.

**2.**
p = nᵢ² ÷ N_D

p = 2.1 × 10²⁰ ÷ 10¹⁸

p = **210 cm⁻³**

From: §3, Equation 4

</details>

---

### M4: Calculation with a units trap

[As] = 5 × 10²² m⁻³.

Find n and p.

<details><summary>Answer</summary>

Convert first:

5 × 10²² ÷ 10⁶ = 5 × 10¹⁶ cm⁻³

As is a donor, so n-type:

n = N_D = **5 × 10¹⁶ cm⁻³**

p = 2.1 × 10²⁰ ÷ (5 × 10¹⁶)

p = **4.2 × 10³ cm⁻³**

From: §3 Equation 4, §6

</details>

---

### M5: Compensation

A Si sample has N_A = 10¹⁷ cm⁻³ and N_D = 3 × 10¹⁶ cm⁻³.

1. Is it n-type or p-type?
2. Find the majority carrier concentration.
3. Find the minority carrier concentration.

<details><summary>Answer</summary>

**1.**
N_A is bigger, so **p-type**.

**2.**
p ≈ N_A − N_D

p ≈ 10¹⁷ − 3 × 10¹⁶

p ≈ **7 × 10¹⁶ cm⁻³**

**3.**
n = nᵢ² ÷ p

n = 2.1 × 10²⁰ ÷ (7 × 10¹⁶)

n = **3 × 10³ cm⁻³**

From: §7, then mass action (Topic 1 §5)

</details>

---

### M6: Explain

Write down the 4 kinds of charge in a doped semiconductor.

Say which ones can carry current and why.

<details><summary>Answer</summary>

1. Free electrons, n (−)
2. Free holes, p (+)
3. Ionised donors, N_D⁺ (+)
4. Ionised acceptors, N_A⁻ (−)

Only electrons and holes carry current.

The ions are part of the lattice, so they can't move.

From: §1

</details>

---

### M7: Explain

Why does doping lower the resistance of silicon?

<details><summary>Answer</summary>

Doping adds carriers: electrons from donors or holes from acceptors.

More carriers means higher conductivity, so lower resistance.

From: §8

</details>
