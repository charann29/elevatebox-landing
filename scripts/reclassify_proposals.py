"""Re-check the industry of every plan in src/lib/proposals.json by the business name, drop
national brands, and rebuild each plan's industry copy (AI calls, builds, steps) to match.

Usage: python3 scripts/reclassify_proposals.py

Why: the source lists' business types put packaging makers under food, engineering firms under
education and cement makers under real estate, so their growth plans pitched the wrong funnel.
The name is the better signal; with no clue in the name the source type is kept, except for the
categories in WEAK, where it proved wrong more often than right.
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / "scripts/proposals.py").read_text()
ns: dict = {}
exec(src[src.index("INDUSTRIES = ["):src.index("PARKED =")], ns)  # the industry copy tables only
COPY = {label: (voice, stack) for label, _rx, voice, stack in ns["INDUSTRIES"]}
COPY[ns["GENERIC"][0]] = (ns["GENERIC"][1], ns["GENERIC"][2])

DROP = re.compile(r"\b(nmdc|bharat biotech|maruti suzuki|orient cement|sagar cements?|anjani portland|ivrcl|ramky|medreich)\b", re.I)
WEAK = {"Food & hospitality", "Education", "Jewellery", "Travel & logistics", "Real estate & construction"}
RULES = [  # first match wins
    ("Hospital & clinic", r"hospital|clinic|nursing home|diagnos|dental|eye care|physio|homo?eo|maternity|fertility|\bskin\b|\bdr\.?\s"),
    ("Jewellery", r"jewel|diamond|pearl|ornament|\bgold\b"),
    ("Education", r"school|college|academy|institut|coaching|tuition|educational|university|vidya"),
    ("Food & hospitality", r"restaurant|hotel|\bcafe\b|bakery|bakers|sweets|cater|resort|banquet|\bdine|biryani|dhaba|chocolate room"),
    ("Travel & logistics", r"travel|\btours?\b|(?<!intra)logistic|transport|courier|cargo|movers|freight|forex"),
    ("Real estate & construction", r"real ?estate|construction|builders?\b|developers?\b|interio|architect|propert|realty|\bhomes\b|villas?\b|infra"),
    ("Pharma & medical supplies", r"pharma|drug|surgical|medicine|chemist|life ?sciences|biotech|ayurved|herbal|remedies|\blabs?\b|laborator"),
    ("Manufacturing & industrial", r"mfrs|manufactur|industr|engineer|machin|fabricat|pump|valve|electr|steel|plastic|poly|chemic|chem\b|spares|equipment|enclosure|motor|tools|pipes|cable|packag|pack|print|\bfoods?\b|products|mills|pneumatic|fluid|impex|exim|export|ecotech|nutri|agro|metal|forg|\bcast|cement|concrete|tyre|wires|solar|energy|starch|coffee|\btea\b|organics|crop|textile|garment|doors|weigh|drill|mixer|fencing|inks|devices|systems|automation"),
]

path = ROOT / "src/lib/proposals.json"
items = json.loads(path.read_text())
out, moved, dropped = [], {}, []
for p in items:
    if DROP.search(p["name"]):
        dropped.append(p["name"])
        continue
    new = "Services & trade" if "placement" in p["name"].lower() else next((label for label, rx in RULES if re.search(rx, p["name"], re.I)), None)
    if new is None:
        # no clue in the name: trust the source type, except where the source lists proved unreliable
        new = "Services & trade" if p["industry"] in WEAK else p["industry"]
    if new != p["industry"]:
        moved[f'{p["industry"]} -> {new}'] = moved.get(f'{p["industry"]} -> {new}', 0) + 1
        voice, stack = COPY[new]
        gaps = p["stack"][:-2]  # business-specific website fixes come first; the last two were industry ideas
        p.update(
            industry=new,
            voice=voice,
            stack=gaps + stack[:2],
            steps=[
                "Week 1: fix the quickest website gaps above and route every enquiry to one list.",
                f"Month 1: put an AI agent on missed and after-hours calls, starting with: {voice[0][0].lower() + voice[0][1:]}",
                f"Quarter 1: automate the next workflow ({stack[0][0].lower() + stack[0][1:].rstrip('.')}) and measure enquiries won before and after.",
            ],
        )
    out.append(p)

path.write_text(json.dumps(out, ensure_ascii=False, indent=0))
print(len(items), "->", len(out), "dropped", dropped)
for k, v in sorted(moved.items(), key=lambda kv: -kv[1]):
    print(f"{v:4}  {k}")
