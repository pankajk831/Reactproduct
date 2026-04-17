import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    axios.get("https://dummyjson.com/carts")
      .then((res) => {
        const allProducts = res.data.carts.flatMap(cart => cart.products);

        const singleProduct = allProducts.find(p => p.id === parseInt(id));
        setProduct(singleProduct);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

 const ordernow = () => {
  let existingCart = JSON.parse(localStorage.getItem("cart"));

  if (!Array.isArray(existingCart)) {
    existingCart = [];
  }

  const newItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    quantity: quantity,
    total: product.price * quantity
  };

  const alreadyExists = existingCart.find(item => item.id === product.id);

  let updatedCart;

  if (alreadyExists) {
    updatedCart = existingCart.map(item =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
            total: (item.quantity + quantity) * item.price
          }
        : item
    );
  } else {
    updatedCart = [...existingCart, newItem];
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));


    toast.success("✅ Added to cart");

  navigate("/carts"); 
};
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4">
        <div className="row g-4 align-items-center">

          <div className="col-md-5 text-center">
            <img
              src={product.thumbnail}
              className="img-fluid rounded shadow-sm"
              alt={product.title}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <h2 className="mb-3 fw-bold">{product.title}</h2>

            <p className="fs-5"><strong>Price:</strong> ${product.price}</p>
            <p className="fs-5"><strong>Quantity:</strong> {product.quantity}</p>
            <p className="fs-5"><strong>Total:</strong> ${product.total}</p>
            <p className="fs-5"><strong>Discount:</strong> {product.discountPercentage}%</p>
            <p className="fs-5"><strong>Final Price:</strong> ${product.discountedTotal}</p>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-secondary me-2" onClick={decrement}>-</button>
              <span className="fs-5">{quantity}</span>
              <button className="btn btn-secondary ms-2" onClick={increment}>+</button>
            </div>

            <button className="btn btn-danger mt-3" onClick={ordernow}>
              Order Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;