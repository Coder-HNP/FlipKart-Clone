import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">🛍️ Flipkart Clone</Link>
      </div>
      <div className="links">
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/login">🔐 Login</Link>
      </div>
    </nav>
  );
}
