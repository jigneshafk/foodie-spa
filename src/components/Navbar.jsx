import { Link, NavLink } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Navbar({ theme, onToggleTheme }) {
  const { totals } = useCart();
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">🍽️ Foodie</Link>
        <nav className="nav-links">
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/cart" className="cart-link" aria-label="Cart">
            🛒 Cart
            {totals.count > 0 && <span className="badge" data-testid="cart-count">{totals.count}</span>}
          </NavLink>
          <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme" title="Toggle light / dark">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}
