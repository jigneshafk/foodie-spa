"""Builds Task2_React_SPA_Submission.pdf from screenshots/. Usage: GITHUB_URL=https://github.com/you/foodie-spa python3 build_pdf.py"""
import os, pathlib
from playwright.sync_api import sync_playwright
R=pathlib.Path(__file__).parent; S=R/"screenshots"
GH=os.environ.get("GITHUB_URL","https://github.com/YOUR-USERNAME/foodie-spa")
out=[("01-home-desktop.png","Home page — menu grid, hero search, category chips (desktop, light mode)"),
("02-filter-search-desktop.png","Interactive state — Pizza category + Veg only + sort by price + search 'pizza'"),
("03-empty-search.png","Interactive state — empty search result"),
("04-item-detail.png","Dynamic route /item/:id — item detail with quantity selector"),
("05-cart-coupon.png","Cart — quantity controls, coupon FOODIE10 applied, live totals"),
("06-checkout-validation.png","Checkout — form validation errors"),
("07-checkout-filled.png","Checkout — valid form with payment method selected"),
("08-confirmation.png","Order confirmation with simulated live order tracker"),
("09-404.png","404 page for unknown routes"),
("10-home-dark.png","Dark mode with cart badge count")]
mob=[("11-mobile-home.png","Mobile home (390px)"),("12-mobile-detail.png","Mobile item detail"),("13-mobile-cart.png","Mobile cart"),("14-mobile-checkout-dark.png","Mobile checkout, dark mode")]
code=sorted((S/"code").glob("*.png"),key=lambda p:p.name)
def fig(p,c,cls=""): return f'<figure class="{cls}"><img src="file://{p}"><figcaption>{c}</figcaption></figure>'
h=f"""<html><style>
@page{{size:A4;margin:14mm}} body{{font-family:system-ui,sans-serif;color:#222}}
h1{{font-size:26px;margin:0}} h2{{border-bottom:2px solid #e8590c;padding-bottom:4px;margin-top:0;page-break-before:always}}
figure{{margin:0 0 12px;page-break-inside:avoid}} figure img{{width:100%;border:1px solid #ccc}}
figcaption{{font-size:12px;color:#555;margin-top:3px}} .m{{display:inline-block;width:23%;margin-right:1.5%;vertical-align:top}}
.cover p{{font-size:14px;line-height:1.6}} code{{background:#f3f3f3;padding:1px 5px}}
.half{{width:78%}} .code figure{{page-break-inside:auto}}
</style><body>
<div class=cover><h1>Task 2 — Single-Page Application using React.js</h1>
<p><b>Domain:</b> Online Food Ordering (“Foodie”)<br><b>Stack:</b> React 18, Vite, React Router v6 (HashRouter)<br>
<b>React concepts:</b> functional components, <code>useState</code>, <code>useReducer</code> + Context, props, dynamic routing (<code>/item/:id</code>), <code>useEffect</code>/<code>useMemo</code>, conditional rendering, light/dark theme, responsive layout.<br>
<b>GitHub repository:</b> <a href="{GH}">{GH}</a></p>
<p><b>Contents:</b> 1. GitHub link · 2. Output screenshots (desktop + states) · 3. Mobile responsiveness · 4. Source code screenshots</p></div>
<h2>1. GitHub Repository</h2><p style="font-size:16px"><a href="{GH}">{GH}</a></p>
<p>The repository contains the full source code and a structured <code>README.md</code> (features, concepts table, project structure, run instructions).</p>
<h2>2. Output Screenshots — Desktop &amp; Interactive States</h2>
{''.join(fig(S/f,c,"half" if False else "") for f,c in out[:3])}
{''.join(fig(S/f,c) for f,c in out[3:6])}
{''.join(fig(S/f,c) for f,c in out[6:])}
<h2>3. Mobile Responsiveness (390 × 844)</h2>
{''.join(f'<figure class=m><img src="file://{S/f}"><figcaption>{c}</figcaption></figure>' for f,c in mob)}
<h2>4. Source Code Screenshots</h2><div class=code>
{''.join(fig(p,p.stem.replace('_','/')) for p in code)}</div>
</body></html>"""
(R/"screenshots"/"_submission.html").write_text(h)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto(f"file://{R/'screenshots'/'_submission.html'}"); pg.wait_for_timeout(500)
    pg.pdf(path=str(R/"Task2_React_SPA_Submission.pdf"),format="A4",print_background=True,margin=dict(top="14mm",bottom="14mm",left="14mm",right="14mm")); b.close()
