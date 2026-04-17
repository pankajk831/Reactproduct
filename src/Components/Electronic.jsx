import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function FetchData() {
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate(); 

  const inputhandler = () => {
    inputRef.current.style.color = "red";
  };

//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((res) => res.json())
//       .then((data) => setCarts(data.products));
//   }, [search]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products/category/beauty")
  .then((res) => setCarts(res.data.products))
  .catch(err=>console.log(err.message))
  },[]);

 const filteredData = carts.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
);
  return (

    
    <div className="container mt-4">
          {/* Heading */}
      <div className="text-center mb-4">
        <h2>Beauty  products</h2>
        <p className="text-muted">
          Welcome to our  Beauty products 
        </p>
      </div>

      <h3>Search Products (From Carts)</h3>


      <input  ref={inputRef}  onClick={inputhandler}  type="text"  className="form-control mb-4"  placeholder="Search product..."  value={search}  onChange={(e) => setSearch(e.target.value)}  />
      <div className="row">
        {filteredData.map((item) => (
          <div className="col-md-3 mb-2" key={item.id}>
            <div className="card shadow">

              <img
                src={item.thumbnail}
                className="card-img-top"
                alt={item.title}
                 onClick={() => navigate(`/Productdetail/${item.id}`)}
              />

              <div className="card-body">
                <h5>{item.title}</h5>
                <p><b>Price:</b> {item.price}</p>
                <p><b>Discount:</b> {item.discountPercentage}%</p>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchData;