import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import NotFound from "./components/NotFound";

export default function App() {
  // Theme state (light / dark), persisted in localStorage
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("foodie-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("foodie-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation/:orderId" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">Foodie · React SPA demo · Built with useState, useReducer, props &amp; React Router</footer>
    </>
  );
}
