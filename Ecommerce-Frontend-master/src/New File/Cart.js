import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchCart = useCallback(() => {
    fetch(`https://ecommerce-spring-boot-api-rfjw.onrender.com/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [userId, navigate, fetchCart]);

  const removeFromCart = (productId) => {
    fetch(`https://ecommerce-spring-boot-api-rfjw.onrender.com/api/cart/remove/${userId}/${productId}`, {
      method: "DELETE"
    })
      .then(() => fetchCart())
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Cart is empty!</h4>
          <a href="/" className="btn btn-primary mt-3">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="row">
          {cartItems.map(item => (
            <div className="col-md-4 mb-4" key={item.cartId}>
              <div className="card h-100">
                <img
                  src={`/images/images/${item.productImage}`}
                  className="card-img-top"
                  alt={item.productName}
                  height="200"
                  style={{objectFit: 'cover'}}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.productName}</h5>
                  <p className="card-text text-success">₹{item.productPrice}</p>
                  <p className="card-text text-muted">{item.productDescription}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-danger w-100 mt-auto"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;