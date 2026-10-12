# Topic 1 — Bond model: electrons & holes

**Tutorial Qs this unlocks:** Ch1 Q1, Q2, Q3 · **Slides:** SSD_1 21–53

> **Big idea:** a semiconductor conducts because heat breaks bonds. Each broken bond makes **one free electron (−) and one hole (+)**. Doping adds an extra electron *or* an extra hole on purpose.

---

## 1. Si has 4 valence electrons

![Si atom](../img/01/s25.png)

- Si has 14 electrons in shells of **2 + 8 + 4**.
- Only the **4 outer (valence) electrons** matter. They're the ones that bond and can break free.

## 2. The lattice: every Si shares with 4 neighbours

![Si lattice](../img/01/s28.png)

- Each Si atom shares 1 electron with each of its 4 neighbours, which makes **covalent bonds** (the `=` lines are 2 shared electrons each).
- Every atom then "feels" **8** electrons, a full outer shell, so the lattice is stable.
- 2D sketch rule: **circle = Si atom, 2 dots between neighbours = 1 bond.**

## 3. Temperature breaks bonds → electron-hole pairs

![T=0K vs T>0K](../img/01/s31.png)

| | T = 0 K | T = 300 K (room) |
|---|---|---|
| Bonds | all intact | a few broken |
| Free electrons | **0**, so it's an insulator | some |
| Holes | 0 | same number as free electrons |

![More T, more broken bonds](../img/01/s32.png)

- **Hotter → more carriers → resistance goes DOWN.** That's the opposite of a metal, where hotter means R goes up.

## 4. What a hole actually is

![The hole](../img/01/s39.png)

- A hole is the **empty spot left by a missing bond electron**.
- A neighbouring bond electron hops into it, so the empty spot moves the *opposite* way. It behaves like a **free positive charge (+e)**.
- ❌ It is **not** a missing atom. ❌ It is **not** a proton or a positron. Holes only exist in a lattice.
- In pure (intrinsic) Si: **n = p = nᵢ** (nᵢ = 1.45×10¹⁰ cm⁻³ at 300 K), and **n·p = nᵢ²**.

## 5. Doping: swap a few Si atoms for group III or V

![Periodic table](../img/01/s51.png)

![Doping in the bond model](../img/01/s53.png)

| Dopant | Group | Valence e⁻ | What happens | Type | Name |
|---|---|---|---|---|---|
| **P** (phosphorus) | V | 5 | 4 bond, the **5th is spare → free electron** | **n-type** | donor, N_D |
| **B** (boron) | III | 3 | one bond is missing an electron → **free hole** | **p-type** | acceptor, N_A |

- Memory trick: **P**hosphorus has **P**lenty (5). **B**oron is **B**roke (3).
- The dopant atom is left as a **fixed ion**: P⁺ for n-type, B⁻ for p-type. It can't move, so it doesn't carry current.

---

## Cheat-sheet (exam drawing checklist)
1. 3×3 grid of circles labelled Si, with 2 dots between each pair of neighbours.
2. **T = 0 K:** all dots in the bonds, nothing free.
3. **T = 300 K:** one dot pulled out (free e⁻ with an arrow), its old spot drawn as an empty circle labelled **h⁺**.
4. **n-type:** centre atom is **P**, plus 1 extra loose dot (e⁻) next to it.
5. **p-type:** centre atom is **B**, with one bond showing only 1 dot, so an empty spot = **h⁺**.

➡️ Now do [`questions/01-bond-model.md`](../questions/01-bond-model.md)
