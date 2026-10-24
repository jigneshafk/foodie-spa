// Props: totals { subtotal, discount, delivery, tax, total }
export default function OrderSummary({ totals }) {
  const { subtotal, discount, delivery, tax, total } = totals;
  return (
    <div className="summary">
      <div><span>Subtotal</span><span>₹{subtotal}</span></div>
      {discount > 0 && <div className="ok"><span>Discount</span><span>−₹{discount}</span></div>}
      <div><span>Delivery</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
      <div><span>GST (5%)</span><span>₹{tax}</span></div>
      <div className="total"><span>Total</span><span>₹{total}</span></div>
      {delivery > 0 && <p className="muted small">Free delivery on orders above ₹500</p>}
    </div>
  );
}
