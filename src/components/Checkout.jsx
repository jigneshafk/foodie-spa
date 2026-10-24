import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import OrderSummary from "./OrderSummary";

const validate = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name";
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (f.address.trim().length < 10) e.address = "Enter a complete delivery address";
  if (!/^\d{6}$/.test(f.pin)) e.pin = "Enter a 6-digit PIN code";
  return e;
};

// Reusable controlled input (props: id, label, form, errors, set)
function Field({ id, label, form, errors, set, ...rest }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input id={id} value={form[id]} onChange={set(id)} className={errors[id] ? "invalid" : ""} {...rest} />
      {errors[id] && <small className="err">{errors[id]}</small>}
    </label>
  );
}

export default function Checkout() {
  const { state, dispatch, totals } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", pin: "", payment: "upi" });
  const [errors, setErrors] = useState({});

  if (state.items.length === 0) return <Navigate to="/cart" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const fp = { form, errors, set };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const orderId = "FD" + Math.floor(100000 + Math.random() * 900000);
    try {
      sessionStorage.setItem(orderId, JSON.stringify({ form, items: state.items, totals }));
    } catch {}
    dispatch({ type: "CLEAR" });
    navigate(`/confirmation/${orderId}`);
  };

  return (
    <div className="two-col">
      <form onSubmit={submit} noValidate>
        <h1>Checkout</h1>
        <Field {...fp} id="name" label="Full name" placeholder="Jignesh Lohar" />
        <Field {...fp} id="phone" label="Mobile number" placeholder="9876543210" inputMode="numeric" maxLength={10} />
        <label className="field">
          <span>Delivery address</span>
          <textarea rows={3} value={form.address} onChange={set("address")} className={errors.address ? "invalid" : ""} placeholder="House no, street, area" />
          {errors.address && <small className="err">{errors.address}</small>}
        </label>
        <Field {...fp} id="pin" label="PIN code" placeholder="834001" inputMode="numeric" maxLength={6} />

        <fieldset className="payment">
          <legend>Payment method</legend>
          {[["upi", "UPI"], ["card", "Credit / Debit card"], ["cod", "Cash on delivery"]].map(([v, l]) => (
            <label key={v} className={`radio ${form.payment === v ? "active" : ""}`}>
              <input type="radio" name="payment" value={v} checked={form.payment === v} onChange={set("payment")} /> {l}
            </label>
          ))}
        </fieldset>
        <button className="btn full">Place order · ₹{totals.total}</button>
      </form>

      <aside className="panel">
        <h3>Order summary</h3>
        <ul className="mini-list">
          {state.items.map((i) => (
            <li key={i.id}><span>{i.qty} × {i.name}</span><span>₹{i.price * i.qty}</span></li>
          ))}
        </ul>
        <OrderSummary totals={totals} />
      </aside>
    </div>
  );
}
