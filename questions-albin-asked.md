# Questions Albin asked (per topic)

The bits that confused me, with the short answer. Re-read this before the exam.

---

## Topic 1 — Bond model

**Q: Why does heating lower a semiconductor's R but raise a metal's?**
- R depends on **the number of carriers × how easily they move**.
- Heating always increases **scattering** (atoms vibrate, carriers collide more), which pushes R ↑.
- **Metal:** already has ~1 free e⁻ per atom (~10²² cm⁻³), with no bonds left to break, so the carrier count is fixed. Only scattering changes, so **R ↑**.
- **Si:** starts with very few carriers (~10¹⁰ cm⁻³). Heating breaks bonds and adds lots more carriers, which outweighs the scattering, so **R ↓**.
- Preview of Topic 3: σ = e·n·μ. Heat lowers μ for both materials, but only the semiconductor's n shoots up.
- 📍 Notes: [01 §3](notes/01-bond-model.md)

**Q: Does this module only care about Si, or other semiconductors too?**
- **Basically Si only.** Every tutorial question and every constant on the formula sheet is for Si.
- Ge and GaAs each come up once, in a list on one slide. The LED slides mention other materials, but that section is skipped.
- Same physics, different numbers: if a question ever uses another material, it will give you its nᵢ, E_G etc.

**Q: What do n, p, nᵢ and n·p = nᵢ² actually mean, and when do I use them?**
- **n** = free electrons per cm³, **p** = holes per cm³, **nᵢ** = carriers per cm³ in *pure* Si (1.45×10¹⁰ cm⁻³ at 300 K, on the formula sheet).
- **n = p = nᵢ**: use it only for *intrinsic/pure* Si.
- **n·p = nᵢ²**: use it when you know one of n or p and need the other (p = nᵢ²/n). It works for doped Si too, as long as no bias or light is applied.
- 📍 Notes: [01 §5, "Counting the carriers"](notes/01-bond-model.md)

**Q: Do I look up nᵢ or just know it?**

Look it up.

It's on the formula sheet: nᵢ = 1.45 × 10¹⁰ cm⁻³ for Si at 300 K.

Only learn by heart: n × p = nᵢ² and charge neutrality.

📍 [formula-sheet.md](formula-sheet.md)

**Q: What is happening in the doping diagram (orange P, green B)?**

Orange P: 4 electrons fill its bonds. The 5th (small orange dot) is spare, so it's a free electron. That makes n-type.

Green B: only 3 electrons, so one bond has a gap (small empty circle). That gap is a hole. That makes p-type.

The arrows point at the extra carrier.

📍 [Notes 01 §6](notes/01-bond-model.md)

---

## Topic 2 — Doping: finding n and p

**Q: Is the donor + because it lost an electron, and the acceptor − because it took one in?**

Yes.

P gives away its 5th electron, so it becomes P⁺.

B takes an electron from a neighbouring bond, so it becomes B⁻. The gap left in that bond is the hole.

Each dopant makes a pair: P⁺ and e⁻, or B⁻ and h⁺. That's why charge neutrality balances.

📍 [Notes 02 §1, §2](notes/02-doping-carrier-concentration.md)

**Q: I don't understand charge neutrality (p + N_D = n + N_A).**

Count the pluses and count the minuses. They are always equal.

Plus = holes (p) + donor ions (N_D).

Minus = electrons (n) + acceptor ions (N_A).

Example: 10 P atoms plus 3 broken bonds. Plus = 3 + 10 = 13. Minus = 13 + 0 = 13.

The slide version, −n + p + N_D − N_A = 0, is the same thing moved to one side.

📍 [Notes 02 §2, "Count it with real numbers"](notes/02-doping-carrier-concentration.md)

**Q: What does "write charge neutrality" mean, and how can it be asked?**

It means: write the full equation, then cross out anything that is zero.

p + N_D = n + N_A

Pure Si: p = n. n-type: p + N_D = n. p-type: p = n + N_A.

It can also be asked as "use it to find n and p". Then you combine it with n × p = nᵢ².

📍 [Notes 02 §2, "How write charge neutrality gets asked"](notes/02-doping-carrier-concentration.md)

**Q: How do I know which equation to use?**

Look at the dopant atom.

P or As (group V) = donor = n-type. Use n = N_D, then p = nᵢ² ÷ N_D.

B or Al (group III) = acceptor = p-type. Use p = N_A, then n = nᵢ² ÷ N_A.

"Pure" = n = p = nᵢ.

Given n or p but no dopant = use n × p = nᵢ².

📍 [Notes 02 §3, "How to know which equation to use"](notes/02-doping-carrier-concentration.md)

**Q: Is group V n-type because it has a free electron compared to Si?**

Yes.

Si has 4 outer electrons and uses all 4 in bonds.

Group V (P, As) has 5. Four bond. The 5th has no bond, so it goes free. Free electron = negative = n-type. The atom is left as a fixed P⁺.

Group III (B, Al) has 3. One bond is short, which is a hole. Hole = positive = p-type. The atom becomes a fixed B⁻.

📍 [Notes 02 §1](notes/02-doping-carrier-concentration.md)

---

## Topic 3 — Drift

**Q: What does v = ∓μE and "mobility is always positive" mean?**

The ∓ means two signs, one for each carrier.

Electrons (negative charge): v = −μE. They move **against** the field.

Holes (positive charge): v = +μE. They move **with** the field.

The sign comes from the charge q. The size is the same formula: v = μE.

μ = eτ/m is always positive. Mobility is just "how easily a carrier moves", so it has no sign. The sign sits in the v equation instead.

📍 [Notes 03 §1, Equations 6 and 7](notes/03-drift.md)

<br>

**Q: How do I know μₙ and μₚ for the Q7 samples?**

You read them off the mobility graph. Red line is μₙ, blue line is μₚ.

1. Find the doping on the bottom axis.
2. Go up to the right line.
3. Read across to the side.

Use the **total doping** (acceptors plus donors). Only one is non-zero in each Q7 sample.

For n-type samples you need μₙ. For p-type samples you need μₚ.

The notes also give a table of values, and the official answers use those. Use the table.

📍 [Notes 03 §4](notes/03-drift.md)

<br>

**Q: The mobility graph doesn't start at 0. What do I read for the undoped sample?**

The bottom axis is logarithmic, so 0 can't be on it. The graph starts at 10¹⁴.

Both lines go flat on the left. That flat part is the undoped value.

For sample 1 (intrinsic), use the flat left end: μₙ = 1400 and μₚ = 500.

📍 [Notes 03 §4](notes/03-drift.md)

<br>

**Q: How do I derive σ = e(nμₙ + pμₚ)?**

Current is moving charge, so J = e n v for each carrier type.

Electrons: J = e n μₙ E. Holes: J = e p μₚ E.

Add them, then compare with J = σE.

📍 [Notes 03 §6, "Where Equation 8 comes from"](notes/03-drift.md)

---

## Topic 4 — Diffusion and the built-in field

**Q: Q9 part 1. How was the n(x) and p(x) sketch made?**

Doping is the majority concentration, so n ≈ N(x). That is a straight line down to 0 at x = 0.04.

Holes follow from p = nᵢ²/n. Small n means big p, so p rises towards the right.

Use the calculator table for a few x values, then plot.

📍 [Notes 04 §7](notes/04-diffusion.md), [Notes 01 §5](notes/01-bond-model.md)

<br>

**Q: Q9 part 2. How do I derive the built-in field?**

No current flows, so Jₙ = 0. That means drift cancels diffusion.

Rearrange for E, then swap Dₙ/μₙ for kT/e (Einstein).

Put in n = N(x) and its slope. Result: E(x) = 0.065/(0.1 − 2.5x) V/cm.

⭐ Learn this derivation.

📍 [Notes 04, learn-by-heart box and §7](notes/04-diffusion.md)

<br>

**Q: Q9 part 3. Which way does the field point?**

Electrons diffuse right, from high doping to low doping.

The field must push them back left. Electrons move against E, so E points right.

This matches the positive answer from part 2.

📍 [Notes 04 §7, "Direction"](notes/04-diffusion.md)

---

## Topic 5 — Energy bands and the Fermi level

**Q: How do I know k (Boltzmann constant)?**

It's given: k = 8.62 × 10⁻⁵ eV/K. If it isn't, k = 0.026 eV ÷ 300 K ≈ 8.7 × 10⁻⁵ eV/K.

📍 [Notes 05](notes/05-fermi-level.md)

<br>

**Q: What is the difference between n-type and p-type band diagrams?**

Only E_F moves. n-type: E_F near E_C (lots of electrons). p-type: E_F near E_V (lots of holes). E_C, E_V, E_G and E_i stay the same.

📍 [Notes 05, drawing checklist](notes/05-fermi-level.md)

<br>

**Q: What is E_i?**

The Fermi level of pure Si, near the middle of the gap. E_F above it means n-type, below it means p-type.

📍 [Notes 05 §7](notes/05-fermi-level.md)

<br>

**Q: Q13. What is it asking, and what do I do?**

Derive n = nᵢ e^((E_F − E_i)/kT). Write n for any sample, write it for pure Si (E_F = E_i, n = nᵢ), divide. N_C cancels. Same for p.

📍 [Notes 05 §7, Equation 15](notes/05-fermi-level.md)

<br>

**Q: Q15. Derive the position of E_i.** ⭐ Learn this derivation.

Set n = p with E_F = E_i, put E_V = 0 so E_C = E_G, take logs. E_i = E_G/2 + (kT/2) ln(N_V/N_C) ≈ 0.55 eV above E_V.

📍 [Notes 05, learn-by-heart box and §7](notes/05-fermi-level.md)

<br>

**Q: How does n = N_C e^(−(E_C − E_F)/kT) turn into E_F − E_i = kT ln(N_D/nᵢ)?**

Write the first formula twice, once for your sample and once for pure Si (E_F = E_i, n = nᵢ). Divide. N_C cancels.

n ÷ nᵢ = e^((E_F − E_i)/kT)

Take ln, then swap n for N_D (n-type: n = N_D).

E_F − E_i = kT ln(N_D ÷ nᵢ)

📍 [Notes 05 §7, Equation 15](notes/05-fermi-level.md)

<br>

**Q: Is E_F − E_i = kT ln(N_D/nᵢ) on the formula sheet?**

Not in that form.

The sheet has n = N_C e^(−(E_C − E_F)/kT) (and the p version). Flip it and you get E_C − E_F = kT ln(N_C ÷ n). That does the same job with only sheet values.

📍 [Notes 05 §6](notes/05-fermi-level.md), [formula-sheet.md](formula-sheet.md)

<br>

**Q: How do I rearrange p = N_V e^((E_V − E_F)/kT) to get E_C − E_F?**

Two steps.

1. Solve for the gap above E_V: E_F − E_V = kT ln(N_V ÷ p).
2. The two gaps add up to the bandgap, so E_C − E_F = E_G − (E_F − E_V).

Ch2 Q2 p-Si: E_F − E_V = 0.026 × ln(1.8×10¹⁹ ÷ 5×10¹⁶) = 0.153 eV. So E_C − E_F = 1.12 − 0.153 ≈ 0.97 eV (the card's 0.95 is rounding).

📍 [Notes 05 §6, Equation 14](notes/05-fermi-level.md)

<br>

**Q: What is E_G on the diagram?**

The bandgap: the whole distance from E_C down to E_V.

1.12 eV for Si at 300 K. It's on the constants table.

Doping moves E_F inside the gap. It never changes E_G.

📍 [Notes 05 §1](notes/05-fermi-level.md)

---

## Topic 6 — Workfunction

**Q: How are we meant to know χ?**

You don't calculate it. χ = 4.05 eV is a fixed property of Si.

It's not on the constants table, so the question gives it, or it's in the notes (Topic 6). Learn 4.05 eV.

It's the same for n-Si and p-Si. Only E_C − E_F changes with doping, which you get from the table.

📍 [Notes 06 §1](notes/06-workfunction.md)

---

## Topic 8 — Bringing materials into contact

**Q: Ch2 Q2. What is it asking, and what do I do?**

Draw n-Si and p-Si before contact. Same E_vac, same E_C and E_V heights. Only E_F is different.

n-side E_F is high (near E_C). p-side E_F is low (near E_V).

📍 [Notes 08 §2](notes/08-contact.md)

<br>

**Q: What are E_vac, χ, φ and IE in the Ch2 Q2 diagram?**

E_vac is the free-electron level. It's the ceiling, drawn once for both sides.

χ: E_vac down to E_C. 4.05 eV for Si, same on both sides.

φ: E_vac down to E_F. It changes with doping.

IE: E_vac down to E_V. χ + E_G = 4.05 + 1.12 = 5.17 eV.

📍 [Notes 06](notes/06-workfunction.md), [Notes 08 §2](notes/08-contact.md)

<br>

**Q: How do we get E_C − E_F = 0.12 eV and 0.95 eV, and φ = 4.17 eV and 5 eV?**

Same formula both sides:

E_C − E_F = kT ln(N_C ÷ n)

n-Si: n = N_D, so 0.026 × ln(3.2×10¹⁹ ÷ 3×10¹⁷) = 0.12 eV.

p-Si: n = nᵢ² ÷ N_A = 4.2×10³, so 0.026 × ln(3.2×10¹⁹ ÷ 4.2×10³) = 0.95 eV.

Then φ = χ + (E_C − E_F) = 4.05 + 0.12 = 4.17 eV, and 4.05 + 0.95 = 5.0 eV.

📍 [Notes 08 §2](notes/08-contact.md), [Notes 06 §3](notes/06-workfunction.md)

<br>

**Q: Metal on p-Si (φₘ > φ_Si). Why do the bands bend up?**

- Metal E_F is lower, so electrons flow Si → metal.
- Si near the interface loses electrons, so holes pile up there (+). The metal surface goes −.
- That charge makes a field which pushes electrons back. Flow stops when the E_F lines match, so E_F is flat.
- Far from the interface the Si bands drop with E_F. At the interface they curve **up** to meet the metal.
- Up = E_V closer to E_F = more holes. That matches "gains holes".

📍 [Notes 08](notes/08-contact.md), [Notes 09](notes/09-metal-semiconductor.md)

---

## Topic 9 — Metal–semiconductor

**Q: Ch2 Q6e. What is the Schottky diagram trying to say?**

- It's a one-way valve. Three pictures: 0 V, forward, reverse.
- n-Si: electrons (the majority) leave, so a barrier forms where the bands bend up. ℰ₀ is the built-in field.
- Forward: ℰ_ext points against ℰ₀, the barrier drops by eV, electrons climb over, current flows.
- Reverse: ℰ_ext adds to ℰ₀, the barrier grows by eV, the electron faces the gap, no current.
- p-Si (Q6a) had holes piling up, so no barrier, so ohmic.

📍 [Notes 09](notes/09-metal-semiconductor.md)

<br>

**Q: What are eV and ℰ₀?**

eV is an **energy gap**, not a line: how far the applied voltage V shifts the levels. It's how much the barrier shrinks or grows.

ℰ₀ is the built-in **electric field**, drawn as an arrow at the junction.

Lines = E_C, E_F, E_V. Gaps = eV, eV₀, E_G. Arrows = ℰ.

📍 [Notes 09](notes/09-metal-semiconductor.md)

---

## Topic 10 — pn diode at zero bias

**Q: Ch2 Q5. What is it asking?**

- Draw the bands of a pn junction with no voltage.
- Find E_C, E_F, E_i measured up from E_V (take E_V = 0) on **both** sides.
- Find V₀, the built-in voltage = the total band bending ÷ e.
- One flat E_F line. Bands bend down from p to n by eV₀.

📍 [Notes 10](notes/10-pn-zero-bias.md)

<br>

**Q: Does only E_F change?**

Yes, relative to its own bands.

E_C, E_i, E_V keep their spacing. Doping only moves E_F: up for n-type, down for p-type.

In the joined diode E_F is the flat line, so the n-side bands slide down by eV₀ instead.

📍 [Notes 10](notes/10-pn-zero-bias.md)

<br>

**Q: I got E_F = 0.85 eV on the n-side, not 0.91. Which is right?**

0.85 eV is right when E_G ≈ 1 eV is given.

Use N_C: E_C − E_F = 0.026 × ln(3.2×10¹⁹ ÷ 10¹⁷) = 0.15 eV, so E_F = 1.0 − 0.15 = 0.85 eV.

The 0.91 came from mixing nᵢ = 1.45×10¹⁰ (which belongs to E_G = 1.12) with E_i = 0.5 eV.

p-side the same way: E_F − E_V = 0.026 × ln(1.8×10¹⁹ ÷ 10¹⁷) = 0.135 eV. So V₀ ≈ 0.85 − 0.135 ≈ 0.72 V.

Show your method and either route gets marks.

📍 [Notes 10](notes/10-pn-zero-bias.md)

---
