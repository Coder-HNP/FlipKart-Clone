import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const addToCart = async (id) => {
    if (!token) return alert('Please login first!');
    await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId: id })
    });
    alert('Product added to cart!');
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
