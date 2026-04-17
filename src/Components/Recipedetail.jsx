import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Recipedetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://dummyjson.com/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <div className="text-center mt-5">Loading...</div>;

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // 🔥 ORDER FUNCTION (FIXED)
  const handleOrder = () => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ LOGIN CHECK
    if (!user) {
      toast.error("⚠️ Please login / register first");
      navigate("/login");
      return;
    }

    if (!Array.isArray(existingCart)) existingCart = [];

    const price = recipe.price || 100; // default price

    const newItem = {
      id: recipe.id,
      title: recipe.name,
      price: price,
      thumbnail: recipe.image,
      quantity: quantity,
      total: price * quantity
    };

    // 🔹 check already exist
    const alreadyExists = existingCart.find(p => p.id === recipe.id);

    let updatedCart;

    if (alreadyExists) {
      updatedCart = existingCart.map(p =>
        p.id === recipe.id
          ? {
              ...p,
              quantity: p.quantity + quantity,
              total: (p.quantity + quantity) * p.price
            }
          : p
      );
    } else {
      updatedCart = [...existingCart, newItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("✅ Added to cart");
    navigate("/carts");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4">
        <div className="row g-4 align-items-center">

          <div className="col-md-5 text-center">
            <img
              src={recipe.image}
              className="img-fluid rounded shadow-sm"
              alt={recipe.name}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <h2 className="mb-3 fw-bold">{recipe.name}</h2>
            <p><strong>⭐ Rating:</strong> {recipe.rating}</p>

            <p><strong>🍽 Ingredients:</strong></p>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p><strong>🍴 Meal Type:</strong> {recipe.mealType}</p>

            {/* Quantity */}
            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-secondary me-2" onClick={decrement}>-</button>
              <span className="fs-5">{quantity}</span>
              <button className="btn btn-secondary ms-2" onClick={increment}>+</button>
            </div>

            {/* Order Button */}
            <button className="btn btn-danger mt-3" onClick={handleOrder}>
              Order Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipedetail;