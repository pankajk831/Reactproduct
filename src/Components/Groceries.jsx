import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 Input click effect
  const inputhandler = () => {
    if (inputRef.current) {
      inputRef.current.style.color = "green";
    }
  };

  // 🔥 Fetch Groceries Data
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/groceries")
      .then((res) => {
        setGroceries(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 Search Filter
  const filteredData = groceries.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      
      {/* Heading */}
      <div className="text-center mb-4">
        <h2>Groceries</h2>
        <p className="text-muted">
          Welcome to our grocery collection 🛒
        </p>
      </div>

      <h3>Search Groceries</h3>

      {/* Search Input */}
      <input
        ref={inputRef}
        onClick={inputhandler}
        type="text"
        className="form-control mb-4"
        placeholder="Search groceries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredData.map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>
            <div className="card shadow h-100">

              {/* Image */}
              <img
                src={item.thumbnail}
                className="card-img-top"
                alt={item.title}
                style={{
                  cursor: "pointer",
                  height: "200px",
                  objectFit: "cover"
                }}
                onClick={() => navigate(`/Groceriesdetail/${item.id}`)}
              />

              <div className="card-body">

                {/* Title */}
                <h5>{item.title}</h5>

                {/* Brand */}
                <p className="text-muted mb-1">
                  <b>Brand:</b> {item.brand || "N/A"}
                </p>

                {/* Description */}
                <p style={{ fontSize: "14px" }}>
                  {item.description.substring(0, 60)}...
                </p>

                {/* Category */}
                <p className="mb-1">
                  <b>Category:</b> {item.category}
                </p>

                {/* Rating */}
                <p className="mb-1">
                  ⭐ {item.rating}
                </p>

                {/* Price */}
                <h5 className="text-success">
                  ${item.price}
                </h5>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groceries;