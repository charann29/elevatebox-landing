"""Build src/lib/proposals.json from a homepage crawl (crawl.json, kept outside the repo).

Usage: python3 scripts/proposals.py <crawl.json> [limit=1000] [first_publish=YYYY-MM-DD] [per_week=100]

Only public facts about the business website are used. Owner names, phone numbers and
emails from the source lead lists are never read into the output.
"""
import json, re, sys, datetime
from urllib.parse import urlparse

crawl = json.load(open(sys.argv[1]))
LIMIT = int(sys.argv[2]) if len(sys.argv) > 2 else 1000
FIRST = datetime.date.fromisoformat(sys.argv[3]) if len(sys.argv) > 3 else datetime.date.today()
PER_WEEK = int(sys.argv[4]) if len(sys.argv) > 4 else 100
CHECKED = crawl["checked"]

# (label, keyword regex, voice calls, stack ideas)
INDUSTRIES = [
    ("Hospital & clinic", r"hospital|clinic|nursing|diagnos|dental|eye care|ortho|maternity|health|medical cent|physio|ayur|homoeo|homeo|scan|\blab\b",
     ["Call back every missed appointment enquiry within a minute and book the slot, so patients do not ring the next hospital on the list.",
      "Remind patients the day before their appointment and confirm, reschedule or cancel on the same call.",
      "Post-visit and post-discharge follow-up calls: ask how the patient is, remind them about medicines, and flag anyone who needs a doctor to call back.",
      "Tell patients when their lab report is ready, so the front desk stops answering the same question all day."],
     ["Online appointment booking that writes straight into each doctor's schedule.",
      "Reports, bills and reminders on WhatsApp instead of printouts and phone calls.",
      "One patient record across reception, billing, pharmacy and lab.",
      "A Google review request after each visit, to grow the rating that patients compare first."]),
    ("Jewellery", r"jewel|gold|diamond|silver|ornament",
     ["Answer gold-rate and design enquiries on the phone at any hour, and book a showroom visit.",
      "Call customers before their monthly gold savings scheme instalment is due.",
      "Wedding-season and festival callbacks to past customers, with an offer the staff approve.",
      "Tell customers when a repair or custom order is ready for pickup."],
     ["Catalogue with photos on WhatsApp so customers shortlist designs before visiting.",
      "Savings scheme and order tracking in one system instead of registers.",
      "Customer list with wedding and anniversary dates for timely reminders.",
      "Hallmark and stock tracking linked to billing."]),
    ("Real estate & construction", r"real estate|construct|builder|developer|interior|architect|propert|realty|infra|homes|villa",
     ["Call every portal and ad lead within seconds, ask budget, location and timeline, and book a site visit.",
      "Remind buyers of site visits the evening before, and reschedule on the call.",
      "Payment milestone reminder calls in Telugu or English.",
      "Re-engage old leads when a new phase or a ready-to-move unit opens."],
     ["One lead inbox for 99acres, MagicBricks, Housing, Facebook and walk-ins, so no lead is lost.",
      "Site visit calendar for the sales team with automatic follow-ups.",
      "Construction progress updates with photos sent to buyers every month.",
      "Customer portal for payments, documents and handover status."]),
    ("Education", r"school|college|academy|institut|coaching|training|education|tuition|university",
     ["Call back admission enquiries the same day and book a campus visit or demo class.",
      "Fee due reminder calls to parents, in Telugu or English.",
      "Same-day absence calls to parents.",
      "Event and exam schedule calls before key dates."],
     ["Online admission forms that land in one dashboard.",
      "Fee collection with UPI links and automatic receipts.",
      "Parent updates on WhatsApp: attendance, homework and results.",
      "Enquiry-to-admission tracking to see which ads bring students."]),
    ("Food & hospitality", r"restaurant|hotel|cater|food|sweet|bakery|resort|banquet|\\bcafe\\b|\\bmess\\b|tiffin",
     ["Take table, room and banquet booking calls when the line is busy.",
      "Qualify catering and party enquiries: date, headcount, budget, menu.",
      "Feedback calls after large orders and events.",
      "Confirm bookings a day before to cut no-shows."],
     ["Direct online ordering to avoid aggregator commission on repeat customers.",
      "Banquet and catering calendar with deposits collected online.",
      "Stock and wastage tracking linked to sales.",
      "Google review requests after each visit."]),
    ("Manufacturing & industrial", r"mfrs|manufactur|industr|engineer|machin|fabricat|pump|valve|electric|steel|plastic|chemical|spares|equipment|enclosure|motor|tools|pipes|cable|packag|printing",
     ["Call every IndiaMART, TradeIndia and website enquiry within minutes, ask quantity, spec and location, and pass qualified buyers to sales.",
      "Re-order calls to dealers and repeat buyers on a schedule.",
      "Polite payment reminder calls before and after due dates.",
      "Schedule service and installation visits by phone."],
     ["Quote generation from the enquiry details, with approval by the sales head.",
      "Dealer ordering portal or WhatsApp ordering instead of phone and email chains.",
      "Inventory, production and dispatch tracking in one place, linked to Tally.",
      "Enquiry source tracking to see which marketplace pays back."]),
    ("Pharma & medical supplies", r"pharma|drug|surgical|medicine|chemist|medical",
     ["Re-order calls to chemists and hospitals before their stock runs out.",
      "Answer availability and price enquiries on the phone.",
      "Payment reminder calls to retailers.",
      "Delivery confirmation calls for large orders."],
     ["Retailer ordering app or WhatsApp ordering with live stock.",
      "Batch and expiry tracking linked to billing.",
      "Route planning for deliveries.",
      "Outstanding payment dashboard by retailer."]),
    ("Travel & logistics", r"travel|tour|logistic|transport|courier|cargo|packers|movers|cab|freight",
     ["Answer booking and quote enquiries at any hour and capture trip or shipment details.",
      "Booking confirmation and pickup reminder calls.",
      "Delivery and arrival update calls to customers.",
      "Feedback calls after each trip or move."],
     ["Online quotes and bookings that land in one dashboard.",
      "Live tracking links sent on WhatsApp.",
      "Driver and vehicle scheduling.",
      "Invoices and payment links generated automatically."]),
]
GENERIC = ("Services & trade",
     ["Answer enquiry calls when staff are busy or after hours, capture what the customer needs, and book a callback or visit.",
      "Call back every website and marketplace enquiry within minutes.",
      "Payment and renewal reminder calls.",
      "Feedback calls after each job to catch problems early."],
     ["One enquiry inbox for phone, WhatsApp, website and marketplaces.",
      "Quotes, invoices and payment links generated from the enquiry.",
      "Customer list with follow-up reminders for repeat business.",
      "A Google review request after each job."])

PARKED = re.compile(r"domain|for sale|parked|godaddy|index of|coming soon|suspend|under construction|default page|it works|hostinger|404|not found|error|bluehost|cpanel|plesk|wix\.com", re.I)

SPAM = re.compile(r"slot|gacor|judi|casino|togel|betting|porn|sex|viagra|loan app|escort|toto", re.I)
STOP = set("pvt ltd private limited india indian hyderabad secunderabad telangana the and co company group sri shri new systems system services service enterprises enterprise industries industry solutions technologies technology engineering engineers hospital hospitals clinic clinics centre center care health multi speciality specialty".split())

def matches_site(name, title, host):
    """True when the live site still belongs to this business (guards expired or resold domains)."""
    words = [w for w in re.findall(r"[a-z]+", name.lower()) if len(w) >= 3 and w not in STOP]
    hay = (re.sub(r"[^a-z]", "", host.split(".")[0]) + " " + title.lower())
    if any(w in hay for w in words):
        return True
    initials = "".join(w[0] for w in re.findall(r"[a-z]+", name.lower()) if w not in ("pvt", "ltd", "private", "limited", "the", "and"))
    return len(initials) >= 3 and initials[:3] in host

BIG = re.compile(r"philips|siemens|bosch|honeywell|schneider|abb |godrej|larsen|mahindra|reliance|tata |infosys|wipro|samsung|lg electronics|panasonic|hitachi|toshiba|3m |hindustan unilever|itc ", re.I)
MAKER = re.compile(r"mfrs|manufactur|mills|industries|edible|fats|exporter", re.I)
CLINIC = re.compile(r"hospital|clinic|nursing home|diagnostic cent|dental|physio", re.I)

def industry(kind, title, src, name):
    if src == "biz" and MAKER.search(f"{name} {kind}"):
        label, _, v, s = next(x for x in INDUSTRIES if x[0] == "Manufacturing & industrial")
        return label, v, s
    for text in (kind.lower(), f"{kind} {title}".lower()):  # trust the listed business type first
        for label, rx, v, s in INDUSTRIES:
            if label == "Hospital & clinic" and src == "biz" and not CLINIC.search(f"{name} {kind}"):
                continue  # labs, chemicals and ayurvedic products are not clinics
            if re.search(rx, text):
                return label, v, s
    return GENERIC

def slugify(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")

def clean_name(n):
    n = re.sub(r"\s+", " ", n).strip(" .,-")
    return n.title() if n.isupper() else n

def facts(f):
    return [
        {"label": "Site loads over HTTPS (secure)", "ok": f["https"]},
        {"label": "Built for phone screens", "ok": f["viewport"]},
        {"label": "WhatsApp chat link", "ok": f["whatsapp"]},
        {"label": "Tap-to-call phone link", "ok": f["tel"]},
        {"label": "Enquiry or booking form", "ok": f["form"] or f["booking"]},
        {"label": "Live chat on the site", "ok": f["chat"]},
        {"label": "Telugu content", "ok": f["telugu"]},
        {"label": "Structured data for Google", "ok": f["schema"]},
        {"label": "Visitor analytics installed", "ok": f["analytics"]},
    ]

def gap_ideas(f, name):
    g = []
    if not f["https"]: g.append(f"Move the website to HTTPS. Browsers currently label it 'Not secure', which puts people off before they call.")
    if not f["viewport"]: g.append("Rebuild the pages for phone screens. Most people in India search on a phone, and the site is not set up for small screens.")
    if not f["whatsapp"]: g.append("Add a WhatsApp chat button. Many customers would rather message than call.")
    if not f["tel"]: g.append("Make the phone number tap-to-call so phone visitors can ring in one tap.")
    if not (f["form"] or f["booking"]): g.append("Add an enquiry form that saves every lead to one list, so nothing depends on someone noticing an email.")
    if not f["schema"]: g.append(f"Add structured data so Google can show {name}'s address, hours and services directly in search results.")
    if not f["analytics"]: g.append("Install analytics to see which pages and searches bring enquiries.")
    if not f["telugu"]: g.append("Add Telugu versions of the key pages. Telugu is the first language for most customers in Telangana.")
    y = f.get("copyright")
    if y and y <= datetime.date.today().year - 3: g.append(f"Refresh the website. Its footer still shows {y}, which makes visitors wonder if the business is active.")
    return g

items, seen = [], set()
for f in crawl["items"]:
    title = f.get("title", "")
    if not f.get("ok") or f.get("size", 0) < 3000 or PARKED.search(title) or SPAM.search(title) or not re.search(r"[A-Za-z]", title):
        continue
    host = urlparse(f["final"]).netloc.lower().removeprefix("www.")
    orig = urlparse(f["url"]).netloc.lower().removeprefix("www.")
    if not host or host in seen or host.split(".")[0] != orig.split(".")[0]:
        continue  # dead redirect, shared domain, or duplicate
    name = clean_name(f["name"])
    city = (f["city"] or "Hyderabad").strip().title().replace("Hyderabad/ Secunderabad", "Hyderabad")
    if not name or len(name) > 60 or not matches_site(name, title, host):
        continue
    seen.add(host)
    if f.get("src") == "hosp" and not re.search(r"hospital|clinic|nursing home|diagnos|dental|homo?eo|ayur|physio|eye|skin|scan|\blab|health|care|medical|maternity|ortho|kidney|heart|dr\.?\s", name, re.I):
        f = {**f, "kind": ""}  # hospital-list entry that is not a care provider: classify by its site instead
    if BIG.search(name + " ") or re.search(r"govt|government|collieries|\besi\b|railway|district|college|institute|research", name, re.I):
        continue  # national and global brands: out of scope for these local proposals
    label, voice, stack = industry(f.get("kind", ""), title, f.get("src", ""), name)
    gaps = gap_ideas(f, name)
    if len(gaps) < 2:
        continue  # nothing specific to say; skip rather than publish a generic page
    items.append({
        "slug": slugify(f"{name}-{city}"), "name": name, "city": city, "industry": label,
        "site": f["final"], "checked": CHECKED, "facts": facts(f),
        "voice": voice, "stack": gaps[:4] + stack[:2],
        "steps": [
            f"Week 1: fix the quickest website gaps above and route every enquiry to one list.",
            f"Month 1: put an AI agent on missed and after-hours calls, starting with: {voice[0][0].lower() + voice[0][1:]}",
            f"Quarter 1: automate the next workflow ({stack[0][0].lower() + stack[0][1:].rstrip('.')}) and measure enquiries won before and after.",
        ],
        "_score": len(gaps) + (3 if label == "Hospital & clinic" else 0) + (1 if label != "Services & trade" else 0),
    })

items.sort(key=lambda x: -x["_score"])
items = items[:LIMIT]
slugs = set()
for i, it in enumerate(items):
    while it["slug"] in slugs:
        it["slug"] += "-2"
    slugs.add(it["slug"])
    it["date"] = (FIRST + datetime.timedelta(weeks=i // PER_WEEK)).isoformat()
    del it["_score"]

json.dump(items, open("src/lib/proposals.json", "w"), ensure_ascii=False, indent=0)
from collections import Counter
print(len(items), Counter(i["industry"] for i in items).most_common(), items[-1]["date"] if items else "")
