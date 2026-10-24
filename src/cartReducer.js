import { COUPONS } from "./data/menu";

export const initialCart = { items: [], coupon: null };

// useReducer: all cart logic lives in one pure function.
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      const items = existing
        ? state.items.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { ...action.item, qty: 1 }];
      return { ...state, items };
    }
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "APPLY_COUPON":
      return COUPONS[action.code] ? { ...state, coupon: action.code } : state;
    case "REMOVE_COUPON":
      return { ...state, coupon: null };
    case "CLEAR":
      return initialCart;
    default:
      return state;
  }
}

export function getTotals(state) {
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = state.items.reduce((s, i) => s + i.qty, 0);
  const c = state.coupon ? COUPONS[state.coupon] : null;
  const discount = c ? Math.min(subtotal, c.type === "percent" ? Math.round((subtotal * c.value) / 100) : c.value) : 0;
  const delivery = subtotal === 0 || subtotal - discount >= 500 ? 0 : 40;
  const tax = Math.round((subtotal - discount) * 0.05);
  return { subtotal, count, discount, delivery, tax, total: subtotal - discount + delivery + tax };
}
