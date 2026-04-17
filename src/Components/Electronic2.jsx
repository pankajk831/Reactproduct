import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function FetchCarts() {
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const inputHandler = () => {
    inputRef.current.style.color = "red";
  };

  useEffect(() => {
    axios.get("https://dummyjson.com/carts")
      .then((res) => {
        const allProducts = res.data.carts.flatMap((cart) => cart.products);
        setCarts(allProducts);
      });
  }, []);

  
  const addToCart = (item) => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));

    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }

    const newItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      quantity: 1,
      total: item.price
    };

    const alreadyExists = existingCart.find(p => p.id === item.id);

    let updatedCart;

    if (alreadyExists) {
      updatedCart = existingCart.map(p =>
        p.id === item.id
          ? {
              ...p,
              quantity: p.quantity + 1,
              total: (p.quantity + 1) * p.price
            }
          : p
      );
    } else {
      updatedCart = [...existingCart, newItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

      navigate(`/Electronic2detail/${item.id}`);
  };

  const filteredData = carts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2>Products from Carts</h2>
      </div>

      <input
        ref={inputRef}
        onClick={inputHandler}
        type="text"
        className="form-control mb-4"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredData.map((item, index) => (
          <div className="col-md-3 mb-4" key={item.id + "_" + index}>
            <div className="card shadow p-3">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-img-top"
                onClick={() => navigate(`/Electronic2detail/${item.id}`)}
              />

              <div className="card-body">
                <h5>{item.title}</h5>
                <p><b>Price:</b> ${item.price}</p>

                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchCarts;