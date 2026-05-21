import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem("username");


  const handleSearch = () => {
    if (search.trim() !== '') {
      navigate(`/?search=${search}`);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">
      <a className="navbar-brand" href="/">MyShop</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/#" data-bs-toggle="dropdown">
              Categories
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/?category=electronics">Electronics</a></li>
              <li><a className="dropdown-item" href="/?category=fashion">Fashion</a></li>
              <li><a className="dropdown-item" href="/?category=accessories">Accessories</a></li>
              <li><a className="dropdown-item" href="/?category=sports">Sports</a></li>
              <li><a className="dropdown-item" href="/?category=study">Study</a></li>
              <li><a className="dropdown-item" href="/?category=music">Music</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cart">Cart 🛒</a>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="d-flex me-3">
          <input
            type="search"
            className="form-control me-2"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-light" onClick={handleSearch}>
            Search
          </button>
        </div>

        <ul className="navbar-nav">
          {username ? (
            <>
              <li className="nav-item">
                <span className="nav-link">👤 {username}</span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">Signup</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;