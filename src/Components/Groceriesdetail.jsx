import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // ✅ Smartphones API use kar rahe hai
  useEffect(() => {
      axios.get("https://dummyjson.com/products/category/groceries")
      .then((res) => {
        const foundProduct = res.data.products.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  // 🔥 ORDER NOW
  const ordernow = () => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("⚠️ Please login");
      navigate("/login");
      return;
    }

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
    navigate("/Carts");
  };

  // 🔹 Quantity
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <div className="row">

          <div className="col-md-5 text-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "250px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <h2>{product.title}</h2>
            <p>{product.description}</p>

            <p><b>Brand:</b> {product.brand}</p>
            <p><b>Rating:</b> ⭐ {product.rating}</p>
            <p><b>Discount:</b> {product.discountPercentage}%</p>
            <p><b>Price:</b> ${product.price}</p>

            {/* Quantity */}
            <div className="d-flex align-items-center">
              <button className="btn btn-secondary" onClick={decrement}>-</button>
              <span className="mx-3">{quantity}</span>
              <button className="btn btn-secondary" onClick={increment}>+</button>
            </div>

            <button className="btn btn-danger mt-3" onClick={ordernow}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;