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
