# Topic 1 — End-of-topic test (tutorial Qs)

Try each one before opening the answer.

---

### Q1 (Tutorial Ch1 Q1)
Sketch a 2D Si lattice of 9 atoms with their valence electrons at **T = 0 K**. How does it change at **T = 300 K**?

<details><summary>Answer</summary>

```
T = 0 K                         T = 300 K
 Si : Si : Si                   Si : Si : Si
 ..   ..   ..                   ..   ..   ..
 Si : Si : Si                   Si : Si  o Si      ● ← free e⁻ (moves)
 ..   ..   ..                   ..   ..   ..       o = hole h⁺ (empty spot)
 Si : Si : Si                   Si : Si : Si
(":" and ".." = 2-electron bond)
```
- At **0 K**: every valence electron is locked in a bond. No free carriers, so it's an insulator.
- At **300 K**: thermal energy breaks a few bonds. Each break gives **1 free e⁻ + 1 hole**, so n = p.
</details>

---

### Q2 (Tutorial Ch1 Q2)
Repeat the T > 0 K sketch for (i) **p-type** and (ii) **n-type** Si.

<details><summary>Answer</summary>

```
(i) p-type: centre = B          (ii) n-type: centre = P
 Si : Si : Si                     Si : Si : Si
 ..   ..   ..                     ..   ..   ..
 Si : B  o Si   o = hole h⁺       Si : P  : Si   ● ← extra free e⁻
 ..   ..   ..                     ..   ..   ..
 Si : Si : Si                     Si : Si : Si
```
- **B** has 3 valence e⁻, so one bond is short an electron → **hole**. B becomes a fixed **B⁻** ion once the hole leaves.
- **P** has 5 valence e⁻, so 4 bond and **1 spare → free electron**. P becomes a fixed **P⁺** ion.
- Because T > 0, you can still draw one thermal e⁻/h⁺ pair, but the dopant carrier dominates.
</details>

---

### Q3 (Tutorial Ch1 Q3)
Holes in semiconductors are:
- i. Voids in the lattice where the atom is missing
- ii. A positively charged carrier that can freely roam the lattice at T = 300 K
- iii. A proton in the nucleus

<details><summary>Answer</summary>

**ii.** A hole is a missing *bond electron*, not a missing atom (i) and not a proton (iii). It moves as neighbouring electrons fill it, and it acts like a +e charge.
</details>

---

## Midterm-style (different formats from the tutorial)
Every answer cites the notes section (§) it comes from. If you're stuck, go back there.

### M1 — True / False
a. At T = 0 K, pure Si is a good conductor.
b. A hole is a vacancy where a Si atom is missing.
c. In intrinsic Si, n = p.
d. The donor ion in n-type Si can move and carry current.
e. Arsenic (group V) makes p-type Si.

<details><summary>Answer</summary>

a. **F**: no free carriers at 0 K, so it's an insulator (§3).
b. **F**: it's a missing *bond electron*, not a missing atom (§4).
c. **T**: each broken bond makes one e⁻ and one h⁺ (§4).
d. **F**: P⁺ is fixed in the lattice (§5).
e. **F**: group V has 5 e⁻, so As is a donor and makes n-type (§1 rule + §5).
</details>

### M2 — Multiple choice
Silicon is doped with aluminium (group III). The material is:
A) n-type, Al⁺ ions  B) p-type, Al⁻ ions  C) p-type, Al⁺ ions  D) intrinsic

<details><summary>Answer</summary>

**B.** Group III has 3 e⁻, so one bond is short and a hole forms → p-type (§1, §5). When Al takes an electron to finish its bond it becomes **Al⁻**, a fixed ion (§5, the B⁻ case).
</details>

### M3 — Explain (short answer, ~3 lines)
Explain why the resistance of a semiconductor decreases with temperature, whereas a metal's increases.

<details><summary>Answer</summary>

In a semiconductor, heat breaks covalent bonds, and each break makes a free e⁻ and a hole. More carriers means lower resistance (§3). A metal's number of carriers is essentially fixed. Heat only increases scattering, so its resistance rises (§3).
</details>

### M4 — Short calculation
Intrinsic Si at a higher temperature has n = 10¹² cm⁻³. Find p and the product n·p.

<details><summary>Answer</summary>

Intrinsic means n = p (§4), so **p = 10¹² cm⁻³**.
n·p = nᵢ² = (10¹²)² = **10²⁴ cm⁻⁶** (§4).
</details>

### M5 — Sketch + label
Sketch a single bond-model diagram that shows **both** a thermally generated electron-hole pair **and** a donor atom. Label every carrier and ion.

<details><summary>Answer</summary>

```
 Si : Si : Si
 ..   ..   ..
 Si : P⁺ : Si   ●  ← e⁻ from donor (the 5th electron)
 ..   ..   ..
 Si  o Si : Si  ●  ← thermal e⁻
     ↑ h⁺ (bond it left)
```
Labels: **P⁺** = fixed donor ion. The e⁻ beside it is the donor electron (§5). The other e⁻ + **o (h⁺)** pair is thermally generated (§3, §4). See the cheat-sheet checklist at the end of the notes.
</details>
