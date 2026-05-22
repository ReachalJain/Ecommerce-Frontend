import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const addToCart = (productId) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate('/login');
            return;
        }

        fetch("https://ecommerce-spring-boot-api-rfjw.onrender.com/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: parseInt(userId),
                productId: productId,
                quantity: 1
            })
        })
            .then(res => res.text())
            .then(data => {
                alert(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const cat = searchParams.get('category');
        const searchQuery = searchParams.get('search');

        let url = "https://ecommerce-spring-boot-api-rfjw.onrender.com/api/products";

        if (cat) {
            url = `https://ecommerce-spring-boot-api-rfjw.onrender.com/api/products/category/${cat}`;
        } else if (searchQuery) {
            url = `https://ecommerce-spring-boot-api-rfjw.onrender.com/api/products/search?name=${searchQuery}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [searchParams]);

    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="container mt-4">
            <h2>Our Products</h2>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-3 mb-4" key={product.productId}>
                        <div className="card h-100">
                            <img
                                src={`/images/images/${product.imageUrl}`}
                                className="card-img-top"
                                alt={product.name}
                                height="200"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{capitalize(product.name)}</h5>
                                <p className="card-text">₹{product.price}</p>
                                <p className="card-text text-muted">{product.description}</p>
                                <div className="mt-auto">
                                    <button
                                        className="btn btn-primary w-100 mb-2"
                                        onClick={() => addToCart(product.productId)}
                                    >
                                        Add to Cart 🛒
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary w-100"
                                        onClick={() => navigate(`/product/${product.productId}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;