import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const STEPS = ["Order placed", "Preparing", "Out for delivery", "Delivered"];

export default function Confirmation() {
  const { orderId } = useParams();
  const [step, setStep] = useState(0);

  // Simulated live order tracking
  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 2500);
    return () => clearTimeout(t);
  }, [step]);

  let order = null;
  try {
    order = JSON.parse(sessionStorage.getItem(orderId));
  } catch {}

  return (
    <div className="confirm">
      <div className="big-emoji">🎉</div>
      <h1>Order confirmed!</h1>
      <p className="muted">Order ID <b>{orderId}</b>{order && <> · Delivering to {order.form.name}</>}</p>

      <ol className="tracker">
        {STEPS.map((s, i) => (
          <li key={s} className={i <= step ? "done" : ""}>
            <span className="dot">{i <= step ? "✓" : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      {order && (
        <div className="panel left">
          <ul className="mini-list">
            {order.items.map((i) => (
              <li key={i.id}><span>{i.qty} × {i.name}</span><span>₹{i.price * i.qty}</span></li>
            ))}
          </ul>
          <div className="summary"><div className="total"><span>Paid ({order.form.payment.toUpperCase()})</span><span>₹{order.totals.total}</span></div></div>
        </div>
      )}
      <Link to="/" className="btn">Order more</Link>
    </div>
  );
}
