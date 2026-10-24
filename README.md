# 🍽️ Foodie — Online Food Ordering SPA (React.js)

A dynamic Single-Page Application for ordering food online, built with **React 18**, **Vite** and **React Router**. No backend or network is needed — the menu is local data, and the cart persists in `localStorage`.

## Features

- **Browse menu** — 14 dishes across 5 categories
- **Search, filter & sort** — live text search, category chips, veg-only toggle, sort by rating / price
- **Dynamic routing** — `/item/:id` detail pages, "more in category" links, 404 page
- **Cart** — add, increase, decrease, remove, clear; live badge count in the navbar
- **Coupons** — try `FOODIE10` (10% off) or `WELCOME50` (₹50 off); free delivery above ₹500
- **Checkout** — controlled form with validation (name, 10-digit mobile, address, 6-digit PIN) and payment method
- **Order confirmation** — simulated live order tracker (Placed → Preparing → Out for delivery → Delivered)
- **Light / Dark mode** — toggle in the navbar; remembers your choice and follows the OS preference
- **Fully responsive** — desktop, tablet and mobile layouts

## React concepts demonstrated

| Concept | Where |
|---|---|
| Functional components | every file in `src/components/` |
| `useState` | `Home.jsx` (search/filter/sort), `Checkout.jsx` (form, errors), `ItemDetail.jsx` (quantity), `App.jsx` (theme) |
| `useReducer` | `cartReducer.js` + `CartContext.jsx` (cart & coupon logic) |
| Context API | `CartContext.jsx` |
| Props | `FoodCard` (`item`), `OrderSummary` (`totals`), `Navbar` (`theme`, `onToggleTheme`), `Field` |
| Dynamic routing | `App.jsx` routes, `useParams`, `useNavigate`, `<Navigate>` |
| `useEffect` / `useMemo` | persistence, theme, order tracker timer, filtered list |
| Conditional rendering | empty cart, empty search, validation errors, 404 |

## Project structure

```
foodie-spa/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # entry: HashRouter + CartProvider
    ├── App.jsx             # routes + theme state
    ├── CartContext.jsx     # context provider (useReducer + localStorage)
    ├── cartReducer.js      # pure reducer + totals calculation
    ├── styles.css          # design tokens, light/dark themes, responsive rules
    ├── data/menu.js        # menu items & coupons
    └── components/
        ├── Navbar.jsx
        ├── Home.jsx
        ├── FoodCard.jsx
        ├── ItemDetail.jsx
        ├── Cart.jsx
        ├── OrderSummary.jsx
        ├── Checkout.jsx
        ├── Confirmation.jsx
        └── NotFound.jsx
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
```

## Screenshots

See the `screenshots/` folder (desktop, mobile, dark mode, cart, checkout validation, confirmation).
