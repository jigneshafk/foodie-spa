import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MENU } from "../data/menu";
import { useCart } from "../CartContext";
import NotFound from "./NotFound";

// Dynamic route: /item/:id
export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const item = MENU.find((m) => m.id === Number(id));

  if (!item) return <NotFound />;

  const addToCart = (goToCart) => {
    for (let i = 0; i < qty; i++) dispatch({ type: "ADD", item });
    if (goToCart) navigate("/cart");
  };

  const related = MENU.filter((m) => m.category === item.category && m.id !== item.id).slice(0, 3);

  return (
    <div>
      <Link to="/" className="back">← Back to menu</Link>
      <div className="detail">
        <div className="detail-img">{item.emoji}</div>
        <div>
          <span className={`pill ${item.veg ? "veg" : "nonveg"}`}>{item.veg ? "Vegetarian" : "Non-veg"}</span>
          <h1>{item.name}</h1>
          <p className="muted">{item.category} · ⏱ {item.time} min · ⭐ {item.rating}</p>
          <p>{item.desc}</p>
          <h2 className="price">₹{item.price}</h2>
          <div className="row">
            <div className="qty big">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn" onClick={() => addToCart(false)}>Add · ₹{item.price * qty}</button>
            <button className="btn ghost" onClick={() => addToCart(true)}>Buy now</button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h3 className="section-title">More in {item.category}</h3>
          <div className="related">
            {related.map((r) => (
              <Link key={r.id} to={`/item/${r.id}`} className="related-item">
                <span>{r.emoji}</span> {r.name} <b>₹{r.price}</b>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
