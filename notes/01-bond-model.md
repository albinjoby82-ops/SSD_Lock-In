# Topic 1 — Bond model: electrons & holes

**Tutorial Qs this unlocks:** Ch1 Q1, Q2, Q3 · **Slides:** SSD_1 21–53

> **Big idea:** a semiconductor conducts because heat breaks bonds. Each broken bond makes **one free electron (−) and one hole (+)**. Doping adds an extra electron *or* an extra hole on purpose.

**How to use:** at every 🧠, stop and answer out loud or on paper **before** opening it.

---

## 1. Si has 4 valence electrons

![Si atom](../img/01/s25.png)

- Si has 14 electrons in shells of **2 + 8 + 4**.
- Only the **4 outer (valence) electrons** matter. They're the ones that bond and can break free.
- Rule: elements in the **same group (column)** of the periodic table have the **same number of valence electrons**. Group IV (C, Si, Ge) = 4, group III (B, Al) = 3, group V (P, As) = 5.

> 🧠 **Check:** Germanium is in the same group as Si. How many valence electrons does it have?
> <details><summary>Answer</summary>4. Same group means the same number of outer electrons.</details>

## 2. The lattice: every Si shares with 4 neighbours

![Si lattice](../img/01/s28.png)

- Each Si atom shares 1 electron with each of its 4 neighbours, which makes **covalent bonds** (the `=` lines are 2 shared electrons each).
- Every atom then "feels" **8** electrons, a full outer shell, so the lattice is stable.
- 2D sketch rule: **circle = Si atom, 2 dots between neighbours = 1 bond.**

> 🧠 **Check:** Each Si atom only *owns* 4 electrons. Why does it "feel" 8?
> <details><summary>Answer</summary>Each of its 4 bonds holds 2 electrons, one of its own and one from the neighbour. 4 bonds × 2 = 8.</details>

## 3. Temperature breaks bonds → electron-hole pairs

![T=0K vs T>0K](../img/01/s31.png)

> 🧠 **Predict first:** at T = 0 K, how many electrons are free to carry current? Is Si a conductor or an insulator there?
> <details><summary>Answer</summary>Zero free electrons, so it's an insulator. Every electron is locked in a bond.</details>

| | T = 0 K | T = 300 K (room) |
|---|---|---|
| Bonds | all intact | a few broken |
| Free electrons | **0**, so it's an insulator | some |
| Holes | 0 | same number as free electrons |

![More T, more broken bonds](../img/01/s32.png)

- **Hotter → more carriers → resistance goes DOWN.** That's the opposite of a metal, where hotter means R goes up.

**Why the two behave differently.** Resistance depends on *how many carriers* there are × *how easily each one moves*. Heating does two things:

| Effect of heating | Si | Copper |
|---|---|---|
| ① Atoms vibrate more, so carriers bump into them more often (scattering) and move less easily | R ↑ a little | R ↑ |
| ② Breaks more bonds, so there are **more carriers** | R ↓ **a lot** | doesn't happen (already ~1 free e⁻ per atom) |
| **Net** | **R ↓** | **R ↑** |

> 🧠 **Check:** you heat a Si resistor and a copper wire. Which way does each one's resistance go, and why are they different?
> <details><summary>Answer</summary>Si: R ↓, because more broken bonds means more carriers. Copper: R ↑, because its carrier number is fixed and the heat only adds scattering.</details>

## 4. What a hole actually is

![The hole](../img/01/s39.png)

- A hole is the **empty spot left by a missing bond electron**.
- A neighbouring bond electron hops into it, so the empty spot moves the *opposite* way. It behaves like a **free positive charge (+e)**.
- **Current direction:** conventional current flows the way + charge moves, so it goes *with* holes and *against* electrons. Both carriers add to the current.
- ❌ It is **not** a missing atom. ❌ It is **not** a proton or a positron. Holes only exist in a lattice.

> 🧠 **Check:** electrons hop left to fill a hole, one after another. Which way does the hole move, and which way does the current flow?
> <details><summary>Answer</summary>The hole moves right. Current flows right too, because a hole is +ve and current follows positive charge. That matches electrons moving left, which also gives conventional current to the right.</details>

### Counting the carriers: n, p and nᵢ

**Intrinsic** = pure Si, no doping. All of its carriers come from broken bonds.

| Symbol | Meaning | Units | Value |
|---|---|---|---|
| **n** | number of free **electrons** per cm³ | cm⁻³ (read as "per cm³") | depends on the material |
| **p** | number of **holes** per cm³ | cm⁻³ | depends on the material |
| **nᵢ** | carriers per cm³ in **pure** Si (the "i" means intrinsic) | cm⁻³ | **1.45×10¹⁰ cm⁻³** for Si at 300 K, given on the formula sheet |

- nᵢ is a **constant for a given material and temperature**. Hotter means more broken bonds, so a bigger nᵢ.
- For scale: Si has 5×10²² atoms per cm³, so only about 1 in 10¹² atoms has a broken bond at room temperature.

> 📐 **Equation 1 — intrinsic Si: n = p = nᵢ**
> - **Why:** every broken bond makes exactly 1 e⁻ + 1 h⁺, so the two counts are equal.
> - **Use it when:** the question says *intrinsic* or *pure* Si and asks for n or p. The answer is just nᵢ.
> - ⚠️ **Only for undoped Si.** Doped Si (§5) has n ≠ p.

> 📐 **Equation 2 — law of mass action: n · p = nᵢ²** ⭐ *know by heart*
> - **In words:** electrons per cm³ × holes per cm³ always equals the same number, nᵢ².
> - **Units:** cm⁻³ × cm⁻³ = cm⁻⁶. For Si at 300 K: nᵢ² = (1.45×10¹⁰)² ≈ 2.1×10²⁰ cm⁻⁶.
> - **Why it holds:** electrons and holes keep meeting and **recombining** (the electron drops back into the hole). If you add extra electrons, more of the holes get filled, so p falls. The product stays fixed.
> - **Use it when:** you know **one** of n or p and need the **other**: **n = nᵢ²/p** or **p = nᵢ²/n**. This is how you'll find the minority carrier in doped Si (Topic 2).
> - **Works for:** intrinsic *and* doped Si, as long as it's in **equilibrium** (no voltage applied, no light). Under bias it changes (Ch2).
> - **Sanity check for intrinsic Si:** n = p = nᵢ gives nᵢ·nᵢ = nᵢ² ✓

> 🧠 **Check:** intrinsic Si at 300 K has n = 1.45×10¹⁰ cm⁻³. What's p? And what's n·p?
> <details><summary>Answer</summary>Intrinsic, so use Eq 1: p = n = 1.45×10¹⁰ cm⁻³. Then Eq 2: n·p = nᵢ² = (1.45×10¹⁰)² ≈ 2.1×10²⁰ cm⁻⁶.</details>

> 🧠 **Check (preview of Topic 2):** a Si sample has n = 10¹⁶ cm⁻³ at 300 K. Find p. Which equation do you use, and why not Eq 1?
> <details><summary>Answer</summary>n ≠ nᵢ, so it's not intrinsic and Eq 1 doesn't apply. You know n and need p, so use Eq 2: p = nᵢ²/n = 2.1×10²⁰ / 10¹⁶ = 2.1×10⁴ cm⁻³. That's tiny: there are hardly any holes.</details>

## 5. Doping: swap a few Si atoms for group III or V

![Periodic table](../img/01/s51.png)

> 🧠 **Predict first:** P (group V) has 5 valence electrons and replaces a Si atom. It only needs 4 for bonding. What happens to the 5th?
> <details><summary>Answer</summary>It's spare and only loosely held, so at room temperature it breaks free and becomes a free electron. The result is n-type.</details>

![Doping in the bond model](../img/01/s53.png)

| Dopant | Group | Valence e⁻ | What happens | Type | Name |
|---|---|---|---|---|---|
| **P** (phosphorus) | V | 5 | 4 bond, the **5th is spare → free electron** | **n-type** | donor, N_D |
| **B** (boron) | III | 3 | one bond is missing an electron → **free hole** | **p-type** | acceptor, N_A |

- Memory trick: **P**hosphorus has **P**lenty (5). **B**oron is **B**roke (3).
- The dopant atom is left as a **fixed ion**: P⁺ for n-type, B⁻ for p-type. It can't move, so it doesn't carry current.

> 🧠 **Check:** once B's hole wanders off, what charge is left on the B atom, and can it move?
> <details><summary>Answer</summary>B⁻, because it has gained an electron to complete its 4th bond. It's locked into the lattice, so it can't move and doesn't carry current.</details>

> 🧠 **Check:** you want an n-type Si wafer. You have B, Al, P and As. Which can you use?
> <details><summary>Answer</summary>P and As, which are group V (5 e⁻). B and Al are group III, so they'd make p-type.</details>

---

## Cheat-sheet (exam drawing checklist)
1. 3×3 grid of circles labelled Si, with 2 dots between each pair of neighbours.
2. **T = 0 K:** all dots in the bonds, nothing free.
3. **T = 300 K:** one dot pulled out (free e⁻ with an arrow), its old spot drawn as an empty circle labelled **h⁺**.
4. **n-type:** centre atom is **P**, plus 1 extra loose dot (e⁻) next to it.
5. **p-type:** centre atom is **B**, with one bond showing only 1 dot, so an empty spot = **h⁺**.

➡️ End-of-topic test: [`questions/01-bond-model.md`](../questions/01-bond-model.md)
