import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

export default function Cart() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setItems(data.items || []));
  }, []);

  const removeItem = async (id) => {
    await fetch(`${API_BASE_URL}/cart/remove/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(items.filter(item => item.product._id !== id));
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.product._id} className="cart-item">
              <div>
                <strong>{item.product.name}</strong>
                <p>₹{item.product.price} x {item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.product._id)}>Remove</button>
            </div>
          ))}
          <p><strong>Total: ₹{items.reduce((t, i) => t + i.product.price * i.quantity, 0)}</strong></p>
        </>
      )}
    </div>
  );
}
