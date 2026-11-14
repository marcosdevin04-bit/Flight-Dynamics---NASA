"""Generate docs/img/gravity-curve.svg/.png from data/curva_gravedad.json.

Usage: python3 scripts/plot_gravity_curve.py
Source of every value: Olson & Ferkul (2012), AIAA 2012-3492, Table I, p. 6 (NTRS 20130010991).
"""
import json, pathlib
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((ROOT / "data" / "curva_gravedad.json").read_text(encoding="utf-8"))

ORDER = ["0 g", "Luna", "Marte", "1 g"]
LABELS = ["Microgravity\n0 g*", "Moon\n0.16 g", "Mars\n0.38 g", "Earth\n1 g"]
STYLE = {
    "mylar-g": ("#E8642C", "o", "Mylar G film (70.3 kPa)"),
    "ultem-1000": ("#2F6DB5", "s", "Ultem 1000 film (70.3 kPa)"),
    "nomex-ht90-40": ("#12161F", "D", "Nomex HT90-40 fabric (101.3 kPa)"),
}
BG, INK, SOFT = "#F6F3EE", "#12161F", "#4A5262"

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11})
fig, ax = plt.subplots(figsize=(10, 6), dpi=150)
fig.patch.set_facecolor(BG)
ax.set_facecolor(BG)

ax.axvspan(0.6, 1.4, color="#E8642C", alpha=0.10, zorder=0)
ax.text(1, 25.6, "MOON", ha="center", va="top", color="#B4461A", fontsize=10, fontweight="bold")

offsets = {"mylar-g": -0.12, "ultem-1000": 0.0, "nomex-ht90-40": 0.12}
for m in data["materiales"]:
    color, marker, label = STYLE[m["id"]]
    pts = {p["gravedad"]: p for p in m["puntos"]}
    xs = [i + offsets[m["id"]] for i, g in enumerate(ORDER)]
    uloi = [pts[g]["uloi"] for g in ORDER]
    moc = [pts[g]["moc"] for g in ORDER]
    for x, lo, hi in zip(xs, moc, uloi):
        ax.vlines(x, lo, hi, color=color, linewidth=3, alpha=0.35, zorder=2)
    ax.plot(xs, uloi, color=color, linewidth=2, zorder=3, label=label)
    for x, g, y in zip(xs, ORDER, uloi):
        filled = g != "0 g"
        ax.plot(x, y, marker=marker, markersize=8, zorder=4,
                markerfacecolor=color if filled else BG, markeredgecolor=color, markeredgewidth=2)

mylar_moon = next(p for p in data["materiales"][0]["puntos"] if p["gravedad"] == "Luna")
ax.annotate("Mylar: oxygen limit ~5.75 points\nlower on the Moon than on Earth",
            xy=(1 - 0.12, mylar_moon["uloi"]), xytext=(1.55, 14.3),
            fontsize=10, color=INK,
            arrowprops=dict(arrowstyle="->", color=SOFT, lw=1.2))

ax.set_xticks(range(4))
ax.set_xticklabels(LABELS, color=INK)
ax.set_xlim(-0.5, 3.5)
ax.set_ylim(13, 26)
ax.set_ylabel("Lowest oxygen that burned (% O$_2$)\nline = ULOI, bar = range down to MOC", color=INK)
ax.set_title("Oxygen needed to burn vs gravity: lower means more flammable",
             loc="left", fontsize=14, fontweight="bold", color=INK, pad=14)
for s in ["top", "right"]:
    ax.spines[s].set_visible(False)
for s in ["left", "bottom"]:
    ax.spines[s].set_color(SOFT)
ax.tick_params(colors=SOFT)
ax.grid(axis="y", color="#DCD5C9", linewidth=0.8)
ax.legend(frameon=False, loc="upper left", fontsize=10, labelcolor=INK)

fig.text(0.01, 0.01,
         "Source: Olson & Ferkul (2012), AIAA 2012-3492, Table I, p.6 (NTRS 20130010991). Moon and 0 g values from Ferkul & Olson (2011) as reproduced there.\n"
         "*0 g with 30 cm/s forced flow (hollow markers). Reduced-g limits use a 5.18 s drop criterion; 1 g uses NASA-STD-6001 Test 1. Not at lunar habitat pressure (56.5 kPa).",
         fontsize=7.5, color=SOFT, va="bottom")
fig.tight_layout(rect=(0, 0.06, 1, 1))

out = ROOT / "docs" / "img"
out.mkdir(parents=True, exist_ok=True)
fig.savefig(out / "gravity-curve.svg", facecolor=BG)
fig.savefig(out / "gravity-curve.png", facecolor=BG)
print("ok", out / "gravity-curve.svg")
