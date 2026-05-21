import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    fetch("https://ecommerce-spring-boot-api.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.text())
      .then(data => {
        if (data.includes("Successful")) {
          setSuccess("Account created! Redirecting to login...");
          setTimeout(() => navigate('/login'), 2000);
        } else if (data.includes("already")) {
          setError("Email already registered!");
        } else {
          setError("Signup failed. Try again!");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Sign Up</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary w-100"
              onClick={handleSignup}
            >
              Sign Up
            </button>

            <p className="text-center mt-3">
              Already have an account?{' '}
              <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;