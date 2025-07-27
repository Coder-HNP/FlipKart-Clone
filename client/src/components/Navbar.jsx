import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px' }}>🛒 Flipkart</Link>
      <div className="links">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
