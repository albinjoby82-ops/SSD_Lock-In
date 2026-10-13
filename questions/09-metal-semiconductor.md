# Topic 9 — End-of-topic test

Try each question first.
Then click to check.

Each answer says which notes section (§) it comes from.

---

## Part A: Tutorial questions

### Q6 (Tutorial Ch2 Q6)

A metal sits on p-Si, with φₘ > φ_Si. A voltage V can be applied, − on the metal, + on the Si.

a. Draw the band diagram (E_C, E_V, E_F, E_G) through the junction for V = 0.
b. Draw it for V as given.
c. Draw it for the opposite polarity.
d. What type of contact is this?
e. What happens to the I–V curve if the Si is changed to n-type, same φₘ > φ_Si?

<details><summary>Answer</summary>

**a.** φₘ > φ_Si, so metal E_F is lower. Electrons flow Si → metal. p-Si loses electrons = gains holes at the junction. Bands bend **up** towards the metal. E_F flat.

![Official Q6a](../img/09/ans-ch2-q6a.png)

**b.** ℰ_ext adds to ℰ₀. More bending. Holes float up into the metal. Current flows.

![Official Q6b](../img/09/ans-ch2-q6b.png)

**c.** ℰ_ext opposes ℰ₀. Less bending. Holes flow the other way. Current flows.

![Official Q6c](../img/09/ans-ch2-q6c.png)

**d.** **Ohmic.** The metal was chosen so the contact potential **increases** the majority carrier concentration at the interface.

**e.** **Schottky.** Electrons still leave the Si, but now they're the majority, so a barrier forms. Current one way only.

![Official Q6e](../img/09/ans-ch2-q6e.png)

From: §4, §5, §6

</details>

---

## Part B: Midterm-style questions

---

### M1: True or false

1. An ohmic contact has a straight-line I–V curve.
2. A Schottky contact on n-Si forms when φₘ < φ_Si.
3. In a metal–semiconductor junction, the bands bend on the metal side.
4. At V = 0, E_F is flat across a metal–semiconductor junction.
5. An ohmic contact accumulates majority carriers at the junction.

<details><summary>Answer</summary>

1. **True.** (§1)
2. **False.** For n-Si, Schottky needs φₘ **>** φ_Si. (§2)
3. **False.** The metal is a perfect conductor. All bending is on the Si side. (§3)
4. **True.** Same rule as any junction at equilibrium. (§3, Topic 8)
5. **True.** (big idea)

</details>

---

### M2: Multiple choice

Metal φₘ = 4.1 eV on n-Si with φ_Si = 4.3 eV. The contact is:

- A. Schottky, bands bend up
- B. Schottky, bands bend down
- C. Ohmic, bands bend up
- D. Ohmic, bands bend down

<details><summary>Answer</summary>

**D.**

φₘ < φ_Si, so metal E_F is higher. Electrons flow metal → Si. n-Si gains majority carriers. **Ohmic.**

Gained electrons, so bands bend **down** towards the metal (E_C comes closer to E_F).

From: §2, §3

</details>

---

### M3: Explain

Why does a Schottky contact on n-Si block current for one polarity but not the other?

<details><summary>Answer</summary>

At V = 0 the bands bend up towards the metal. That's a hill for electrons.

**+ on the metal:** the external field lowers the hill. Electrons roll over. Current.

**− on the metal:** the hill gets taller. The electrons in the metal face the forbidden gap. No current, just leakage.

From: §6

</details>

---

### M4: Table

Fill in: ohmic or Schottky?

| Si type | φₘ vs φ_Si | Contact |
|---|---|---|
| n | φₘ > φ_Si | ? |
| n | φₘ < φ_Si | ? |
| p | φₘ > φ_Si | ? |
| p | φₘ < φ_Si | ? |

<details><summary>Answer</summary>

| Si type | φₘ vs φ_Si | Contact |
|---|---|---|
| n | φₘ > φ_Si | **Schottky** |
| n | φₘ < φ_Si | **Ohmic** |
| p | φₘ > φ_Si | **Ohmic** |
| p | φₘ < φ_Si | **Schottky** |

From: §2

</details>

---

### M5: Sketch

Sketch the band diagram at V = 0 for a metal on n-Si with φₘ > φ_Si. Then sketch it with + on the metal. Say whether current flows.

<details><summary>Answer</summary>

V = 0: E_F flat. Si bands bend **up** towards the metal (Si lost electrons). This is a Schottky barrier.

+ on the metal: the metal's E_F drops by eV. Hill is lower. Electrons from the Si roll into the metal. **Current flows.**

Compare the left and middle diagrams in the Q6e official answer.

From: §6, drawing checklist

</details>
