import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
      axios.get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>

      {/* 🔥 HERO SECTION */}
      <div className="container mt-4">
        <div className="position-relative rounded overflow-hidden shadow">

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            className="w-100"
            alt="banner"
            style={{ height: "400px", objectFit: "cover"  }}
            
          />

          {/* LEFT TEXT */}
          <div
            className="position-absolute text-white"
            style={{ top: "30%", left: "40px", }}
          >
            <h1 className="fw-bold">Effective & Reliable</h1>
            <p>Best quality products at best price</p>
            <button
  className="btn btn-warning me-2"
  onClick={() => {
    document.getElementById("categories").scrollIntoView({
      behavior: "smooth"
    });
  }}
>
  Shop Now
</button>
            <button className="btn btn-outline-light">Explore</button>
          </div>

          {/* RIGHT CARD */}
          <div
            className="position-absolute bg-white p-4 shadow"
            style={{
           
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              borderRadius: "15px",
              width: "250px",
                background: "linear-gradient(45deg, #1e7e34, #3f7e93)", // ✅ Green theme (hero match)
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}
          >
            <h5 className="fw-bold">Our Mission</h5>
            <p className="text-muted small">
              Provide best quality products with trust & reliability.
            </p>
          </div>

        </div>
      </div>

      {/* 🔥 SERVICES */}
      <div className="container mt-5 text-center">
        <h3 className="fw-bold mb-4">Our Services</h3>

        <div className="row g-4">
          {["Fast Delivery", "Best Quality", "24/7 Support"].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 shadow-sm p-4 h-100">
                <h5>{item}</h5>
                <p className="text-muted small">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* 🔥 CATEGORIES / SERVICES */}
<div className="container mt-5 text-center">
  <h3 className="fw-bold mb-4" id="categories">🛍️ Shop by Categories</h3>
<br />
  <div className="row g-4">

    {[
      {
        title: "Meals",
        path: "/Recipe",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
      },
      {
        title: "Beauty",
        path: "/Electronic",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
      },
      {
        title: "Mobiles",
        path: "/Mobiles",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
      },
      {
        title: "Groceries",
        path: "/Groceries",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e"
      },
      {
        title: "Kitchen",
        path: "/Kitchenaccessories",
        img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
      },
      {
        title: "Other",
        path: "/Electronic2",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
      }
    ].map((item, i) => (

      <div className="col-md-4 col-6" key={i}>
        <div
          className="position-relative text-white"
          style={{
            height: "180px",
            borderRadius: "15px",
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            overflow: "hidden"
          }}
          onClick={() => navigate(item.path)}
        >

          {/* DARK OVERLAY */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)"
            }}
          ></div>

          {/* TEXT */}
          <div
            className="position-absolute w-100 text-center"
            style={{ bottom: "10px" }}
          >
            <h5 className="fw-bold">{item.title}</h5>
          </div>

        </div>
      </div>

    ))}

  </div>
</div>
      {/* 🔥 PRODUCTS */}
    <div className="container mt-5 pb-5">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h3 className="fw-bold">🔥 Popular Products</h3>
<button 
  className="btn btn-outline-dark btn-sm"
  onClick={() => navigate("/Electronic")}
>
  View All
</button>
  </div>

  <div className="row g-4">
    {products.length > 0 ? (
      products.slice(0, 4).map((item) => (
        <div className="col-md-3 col-6" key={item.id}>
          
          <div
            className="card border-0 shadow-sm h-100 position-relative"
            style={{
              cursor: "pointer",
              borderRadius: "15px",
              transition: "0.3s"
            }}
            onClick={() => navigate(`/Productdetail/${item.id}`)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >

            {/* 🔥 Badge */}
            <span
              className="badge bg-warning text-dark position-absolute"
              style={{ top: "10px", left: "10px" }}
            >
              New
            </span>

            {/* 🔥 Image */}
            <img
              src={item.thumbnail}
              className="card-img-top"
              alt={item.title}
              style={{
                height: "180px",
                objectFit: "cover",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px"
              }}
            />

            {/* 🔥 Body */}
            <div className="card-body">
              <h6 className="fw-semibold text-truncate">
                {item.title}
              </h6>

              <p className="text-muted small mb-1">
                {item.category}
              </p>

              <p className="text-success fw-bold mb-2">
                ${item.price}
              </p>

              {/* 🔥 Button */}
              <button className="btn btn-dark w-100 btn-sm rounded-pill">
                Add to Cart
              </button>
            </div>

          </div>

        </div>
      ))
    ) : (
      <p className="text-center">Loading products...</p>
    )}
  </div>
</div>
    </div>
  );
}

export default Home;