import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import Home from "./Components/Home";
import About from "./Components/About";
import Recipe from "./Components/Recipe";
import Recipedetail from "./Components/Recipedetail";
import Electronic from "./Components/Electronic";
import Productdetail from "./Components/Productdetail";
import Navbarmenu from "./Components/Navbarmenu";
import Electronic2 from "./Components/Electronic2";
import Electronic2detail from "./Components/Electronic2detail";
import Footer from "./Components/Footer";
import Carts from "./Components/Carts";
import Oders from "./Components/Oders";
import Login from "./Components/Login";
import Mobiles from "./Components/Mobiles";
import Mobilesdetail from "./Components/Mobilesdetail";

import Groceries from "./Components/Groceries";
import Groceriesdetail from "./Components/Groceriesdetail";


import Kitchenaccessories from "./Components/Kitchenaccessories";
import Kitchenaccessoriesdetail from "./Components/Kitchenaccessoriesdetail";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔒 Protected Route
function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <div>
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Navbar */}
      <Navbarmenu />

      {/* Routes */}
      <Routes>

        {/* Home */}
        <Route path="/" element={<><Home /><About /><Footer /></>} />

        {/* About */}
        <Route path="/about" element={<><About /><Footer /></>} />

        {/* Recipes */}
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipedetail/:id" element={<Recipedetail />} />

        {/* Electronics */}
        <Route path="/electronic" element={<Electronic />} />
        <Route path="/productdetail/:id" element={<Productdetail />} />

        {/* Other */}
        <Route path="/electronic2" element={<Electronic2 />} />
        <Route path="/electronic2detail/:id" element={<Electronic2detail />} />

        {/* Mobiles */}
        <Route path="/Mobiles" element={<Mobiles />} />
   <Route path="/Mobilesdetail/:id" element={<Mobilesdetail />} />

        <Route path="/Groceries" element={<Groceries />} />
   <Route path="/Groceriesdetail/:id" element={<Groceriesdetail />} />

     <Route path="/Kitchenaccessories" element={<Kitchenaccessories />} />
   <Route path="/Kitchenaccessoriesdetail/:id" element={<Kitchenaccessoriesdetail />} />

        {/* 🔒 Protected Routes */}
        <Route path="/carts" element={<ProtectedRoute user={user}><Carts />
 </ProtectedRoute>
          }
        />
kitchen-accessories
        <Route
          path="/oders"
          element={
            <ProtectedRoute user={user}>
              <Oders />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={setUser} />} />

      </Routes>
    </div>
  );
}

export default App;