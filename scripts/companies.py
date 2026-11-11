"""Build src/lib/companies.json, the newly registered companies that get a growth plan, from the
"Top 5000 Telangana Leads" sheet exported as CSV (kept outside the repo; it holds personal data).

Usage: python3 scripts/companies.py <leads.csv>

Only public, non-personal fields leave the sheet: business name, industry, district, activity
and registration month. Contact names, mobiles, emails, directors, addresses, GSTIN and CIN are
never read into the output. Non-profits, rows without a business name and proprietorships
trading under the owner's own name are skipped.
"""
import csv, json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
rows = list(csv.DictReader(open(sys.argv[1], encoding="utf-8")))

DIRECT = {
    "Real Estate & Construction": "Real estate & construction",
    "IT, Software & Tech": "IT & software",
    "Manufacturing & Industrial": "Manufacturing & industrial",
    "Professional & Business Services": "Services & trade",
    "Retail & Wholesale Trading": "Retail & wholesale",
    "Other / Unclassified": "Services & trade",
    "Automobile & Mobility": "Automobile & mobility",
    "Solar, Energy & Electricals": "Solar & energy",
    "Media, Events & Entertainment": "Media & events",
    "Education & Training": "Education",
    "Logistics & Transport": "Travel & logistics",
    "Travel & Tourism": "Travel & logistics",
    "Finance & Insurance": "Finance & insurance",
    "Agriculture & Agro": "Agriculture & agro",
    "Beauty, Wellness & Fitness": "Beauty, wellness & fitness",
}
CARE = re.compile(r"hospital|clinic|diagnos|dental|physio|nursing|health ?care cent|ayur|homo?eo|scan|\blab\b|eye", re.I)
EATS = re.compile(r"restaurant|hotel|\bcafe|bakery|bakers|sweets|cater|resort|banquet|kitchen|biryani|dhaba|\bmess\b|tiffin|food court|\bbar\b|bistro|pizza|tea ?stall|juice", re.I)
MAKE = re.compile(r"manufactur|processing|mills|packag|\bfoods?\b.*(pvt|private|llp|limited)|agro", re.I)
SHOP = re.compile(r"retail|wholesale|trading|traders|kirana|appliances|\bshop\b|store|dealer|distribut|mart\b|enterprises", re.I)
GOLD = re.compile(r"jewel|gold|diamond|silver|ornament", re.I)

def industry(r):
    ind, text = r["Industry"], f'{r["Business name"]} {r["Activity / nature (as given)"]}'
    # the sheet files shops and traders under IT, services or "other"; the activity says otherwise
    if ind in {"IT, Software & Tech", "Professional & Business Services", "Other / Unclassified"} and SHOP.search(r["Activity / nature (as given)"]) and not re.search(r"software|computer program|\bIT\b", text):
        return "Retail & wholesale"
    if ind in DIRECT:
        return DIRECT[ind]
    if ind == "Healthcare & Pharma":
        return "Hospital & clinic" if CARE.search(text) else "Pharma & medical supplies"
    if ind == "Textiles, Fashion & Jewellery":
        return "Jewellery" if GOLD.search(text) else "Textiles & fashion"
    if ind == "Food, Restaurants & Hospitality":
        return "Food & hospitality" if EATS.search(text) or not MAKE.search(text) else "Manufacturing & industrial"
    return None  # non-profits and anything unknown: no growth plan

DISTRICT = {"Hyderabad area (from pincode)": "Hyderabad", "Rangareddy": "Ranga Reddy", "Telangana (district not given)": "Telangana"}

def clean_name(n):
    n = re.sub(r"\s+", " ", n).strip(" .,-")
    if n.isupper():
        n = " ".join(w if len(w) <= 3 and w in {"LLP", "OPC", "HUF", "IT", "AI", "EV", "PVT", "LTD"} else w.capitalize() for w in n.split())
    return re.sub(r"\bPvt\b", "Pvt", re.sub(r"\bPrivate Limited\b", "Private Limited", n, flags=re.I))

def activity(a):
    a = re.sub(r"\s*\((inferred|as given)\)", "", a or "", flags=re.I).strip(" .;,")
    return a[:90].rsplit(" ", 1)[0] + "…" if len(a) > 90 else a

def slugify(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")

out, seen, skipped = [], set(), {"no name": 0, "owner's own name": 0, "non-profit or unknown": 0, "duplicate": 0}
for r in rows:
    name = (r["Business name"] or "").strip()
    if not name:
        skipped["no name"] += 1
        continue
    if r["Constitution"].startswith("Proprietorship") and name.lower() == (r["Legal name"] or "").strip().lower():
        skipped["owner's own name"] += 1
        continue
    ind = industry(r)
    if ind is None or "Section 8" in r["Constitution"] or r["Constitution"] == "Trust":
        skipped["non-profit or unknown"] += 1
        continue
    name = clean_name(name)
    city = DISTRICT.get(r["District"], r["District"]).strip()
    slug = slugify(f"{name}-{city}")
    if slug in seen:
        skipped["duplicate"] += 1
        continue
    seen.add(slug)
    out.append({"slug": slug, "name": name, "industry": ind, "city": city, "activity": activity(r["Activity / nature (as given)"]), "registered": r["Registration date"][:7]})

out.sort(key=lambda x: x["slug"])
(ROOT / "src/lib/companies.json").write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
from collections import Counter
print(len(out), "plans;", "skipped", skipped)
print(Counter(x["industry"] for x in out).most_common())
print(Counter(x["city"] for x in out).most_common(8))
