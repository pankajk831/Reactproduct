import React from "react";

function About() {
  return (
    <div className="container mt-5">
     <br /> <hr /><br />
      {/* Heading */}
      <div className="text-center mb-4">
        <h2>About Us</h2>
        <p className="text-muted">
          Welcome to our product & recipe Website.
        </p>
      </div>

      {/* Section 1 */}
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
            className="img-fluid rounded"
            alt="about"
          />
        </div>

        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h4>Who We Are</h4>
            <p>
             We are a simple React-based web application where users can explore products and recipes. Our goal is to provide a clean UI and smooth user experience.

We focus on delivering an easy-to-use platform where users can quickly search, view, and navigate through different items without any confusion. Our application is designed with modern technologies to ensure fast performance and responsiveness across all devices.

We continuously work on improving features, adding new content, and enhancing the overall design to make the experience better for our users. Whether you are browsing products or discovering new recipes, our aim is to make your journey simple, engaging, and enjoyable.

            </p>
              <div className="col-md-3 col-6 mb-3">
            <h6>Contact Us</h6>
            <p className="small mb-1">📍 Gurgaon, India</p>
            <p className="small mb-1">📞 +91 9876543210</p>
            <p className="small">✉ support@emart.com</p>
          </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="row text-center">

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>📦 Products</h5>
            <p>Browse latest products with details and pricing.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>🍔 Recipes</h5>
            <p>Discover tasty recipes with ratings and reviews.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>⚡ Fast UI</h5>
            <p>Built with React for smooth and fast performance.</p>
          </div>
        </div>
      </div>
    <br /> <br /> <hr /><br />
     </div>
     
  );
}

export default About;