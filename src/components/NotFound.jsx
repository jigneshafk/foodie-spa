import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty">
      <div className="big-emoji">🍽️</div>
      <h2>Page not found</h2>
      <p className="muted">That dish or page doesn't exist.</p>
      <Link to="/" className="btn">Back to menu</Link>
    </div>
  );
}
