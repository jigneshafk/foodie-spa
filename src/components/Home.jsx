import { useMemo, useState } from "react";
import { CATEGORIES, MENU } from "../data/menu";
import FoodCard from "./FoodCard";

export default function Home() {
  // Local UI state with useState
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [sort, setSort] = useState("popular");

  const items = useMemo(() => {
    let list = MENU.filter(
      (m) =>
        (category === "All" || m.category === category) &&
        (!vegOnly || m.veg) &&
        m.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "popular") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, vegOnly, sort]);

  return (
    <>
      <section className="hero">
        <h1>Hungry? Get it delivered in 30 minutes.</h1>
        <p>Fresh, hot and made to order. Use code <b>FOODIE10</b> for 10% off.</p>
        <input
          className="search"
          type="search"
          placeholder="Search dishes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search dishes"
        />
      </section>

      <section className="filters">
        <div className="chips" role="tablist">
          {CATEGORIES.map((c) => (
            <button key={c} className={`chip ${c === category ? "active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="filter-right">
          <label className="switch">
            <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
            <span>Veg only</span>
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
            <option value="popular">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </section>

      {items.length === 0 ? (
        <p className="empty">No dishes match your search 😕</p>
      ) : (
        <section className="grid">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </>
  );
}
