import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const capitalize = (str) => {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        fetch(`https://ecommerce-spring-boot-api-rfjw.onrender.com/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.log(err));
    }, [id]);

    if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={`/images/images/${product.imageUrl}`}
                        alt={product.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-7">
                    <h2>{capitalize(product.name)}</h2>
                    <h4 className="text-success">₹{product.price}</h4>
                    <p>{product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Specs:</strong> {product.specs}</p>
                    <button className="btn btn-primary me-2">
                        Add to Cart 🛒
                    </button>
                    <a href="/" className="btn btn-outline-secondary">
                        Back to Products
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;