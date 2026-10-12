# Questions Albin asked (per topic)

The bits that confused me, with the short answer. Re-read this before the exam.

**Q: What do n, p, nᵢ and n·p = nᵢ² actually mean, and when do I use them?**
- **n** = free electrons per cm³, **p** = holes per cm³, **nᵢ** = carriers per cm³ in *pure* Si (1.45×10¹⁰ cm⁻³ at 300 K, on the formula sheet).
- **n = p = nᵢ**: use it only for *intrinsic/pure* Si.
- **n·p = nᵢ²**: use it when you know one of n or p and need the other (p = nᵢ²/n). It works for doped Si too, as long as no bias or light is applied.
- 📍 Notes: [01 §4, "Counting the carriers"](notes/01-bond-model.md)

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

---
