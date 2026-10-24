import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { COUPONS } from "../data/menu";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const { state, dispatch, totals } = useCart();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  if (state.items.length === 0) {
    return (
      <div className="empty">
        <div className="big-emoji">🛒</div>
        <h2>Your cart is empty</h2>
        <p className="muted">Add something tasty from the menu.</p>
        <Link to="/" className="btn">Browse menu</Link>
      </div>
    );
  }

  const applyCoupon = (e) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (COUPONS[c]) {
      dispatch({ type: "APPLY_COUPON", code: c });
      setMsg({ ok: true, text: `${c} applied — ${COUPONS[c].label}` });
      setCode("");
    } else {
      setMsg({ ok: false, text: "Invalid coupon code" });
    }
  };

  return (
    <div className="two-col">
      <section>
        <h1>Your cart</h1>
        <ul className="cart-list">
          {state.items.map((i) => (
            <li key={i.id} className="cart-row">
              <span className="cart-emoji">{i.emoji}</span>
              <div className="grow">
                <b>{i.name}</b>
                <div className="muted small">₹{i.price} each</div>
              </div>
              <div className="qty">
                <button onClick={() => dispatch({ type: "DECREMENT", id: i.id })} aria-label="Decrease">−</button>
                <span>{i.qty}</span>
                <button onClick={() => dispatch({ type: "ADD", item: i })} aria-label="Increase">+</button>
              </div>
              <b className="line-total">₹{i.price * i.qty}</b>
              <button className="icon-btn" onClick={() => dispatch({ type: "REMOVE", id: i.id })} aria-label={`Remove ${i.name}`}>🗑️</button>
            </li>
          ))}
        </ul>
        <button className="link-btn" onClick={() => dispatch({ type: "CLEAR" })}>Clear cart</button>
      </section>

      <aside className="panel">
        <form className="coupon" onSubmit={applyCoupon}>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" />
          <button className="btn ghost">Apply</button>
        </form>
        {msg && <p className={msg.ok ? "ok small" : "err small"}>{msg.text}</p>}
        {state.coupon && (
          <p className="small">Applied: <b>{state.coupon}</b>{" "}
            <button className="link-btn" onClick={() => dispatch({ type: "REMOVE_COUPON" })}>remove</button>
          </p>
        )}
        <OrderSummary totals={totals} />
        <button className="btn full" onClick={() => navigate("/checkout")}>Proceed to checkout</button>
      </aside>
    </div>
  );
}
