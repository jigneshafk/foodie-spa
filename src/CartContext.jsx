import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { cartReducer, initialCart, getTotals } from "./cartReducer";

const CartContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem("foodie-cart")) || initialCart;
  } catch {
    return initialCart;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, load);
  const totals = useMemo(() => getTotals(state), [state]);

  useEffect(() => {
    try {
      localStorage.setItem("foodie-cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  return <CartContext.Provider value={{ state, dispatch, totals }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
