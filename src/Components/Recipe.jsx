import React, { useEffect, useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function FetchData() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();



const inputhandler = () => {
  inputRef.current.style.color = "red" ;

};
  useEffect(() => {
     axios.get("https://dummyjson.com/recipes")
  .then((res) => setRecipes(res.data.recipes));

  }, []);


const filteredData = recipes.filter((item) =>
item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
    {/* Heading */}
      <div className="text-center mb-4">
        <h2>Recipes</h2>
        <p className="text-muted">
          Welcome to our  recipes 
        </p>
      </div>

 <h3>Search Meals </h3>

      {/* Search Input */}
      <input ref={inputRef}onClick={inputhandler} type="text" className="form-control mb-4"placeholder="Search recipe..." value={search}
       onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <div className="row">
        {filteredData.map((item) => (
          <div className="col-md-3 mb-2" key={item.id}>
            <div className="card shadow">

              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                  onClick={() => navigate(`/Recipedetail/${item.id}`)}
              />
       <div className="card-body">
  <div className="box1">
    <h6 className="text-muted">Name</h6>
    <h5>{item.name}</h5>
  </div>

  <div className="box2">
    <h6 className ="text-muted">Rating</h6>
    <h5>⭐⭐⭐⭐ {item.rating}</h5>
  </div>

  <div className="box3">
    <h6 className="text-muted">Reviews</h6>
    <h5>{item.reviewCount}</h5>
  </div>

  <div className="box4">
    <h6 className="text-muted">Meal Type</h6>
    <h5>{item.mealType}</h5>
  </div>
</div>

            </div>
            </div>
        ))}
      </div>
    </div>
    
  );
}

export default FetchData;