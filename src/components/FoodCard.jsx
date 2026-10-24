import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

// Props: item (menu object)
export default function FoodCard({ item }) {
  const { state, dispatch } = useCart();
  const inCart = state.items.find((i) => i.id === item.id);

  return (
    <article className="card">
      <Link to={`/item/${item.id}`} className="card-img" aria-label={`View ${item.name}`}>
        <span>{item.emoji}</span>
        <span className={`diet ${item.veg ? "veg" : "nonveg"}`} title={item.veg ? "Vegetarian" : "Non-vegetarian"} />
      </Link>
      <div className="card-body">
        <h3><Link to={`/item/${item.id}`}>{item.name}</Link></h3>
        <p className="muted small">{item.category} · ⏱ {item.time} min · ⭐ {item.rating}</p>
        <div className="card-foot">
          <strong>₹{item.price}</strong>
          {inCart ? (
            <div className="qty">
              <button onClick={() => dispatch({ type: "DECREMENT", id: item.id })} aria-label="Decrease">−</button>
              <span>{inCart.qty}</span>
              <button onClick={() => dispatch({ type: "ADD", item })} aria-label="Increase">+</button>
            </div>
          ) : (
            <button className="btn" onClick={() => dispatch({ type: "ADD", item })}>Add</button>
          )}
        </div>
      </div>
    </article>
  );
}
