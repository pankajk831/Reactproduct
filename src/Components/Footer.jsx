import React from "react";

function Footer() {
  return (
    <footer
      className="text-white pt-4"
     style={{
        background: "linear-gradient(45deg, #1e7e34, #3f7e93)", // ✅ Green theme (hero match)
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}
    >
      <div className="container">
        <div className="row">

          {/* 🏢 About */}
          <div className="col-md-3 col-6 mb-4">
            <h5 className="fw-bold">🛍️ E-Mart</h5>
            <p className="small">
              Your one-stop shop for meals & products. Fast delivery and best prices.
            </p>
          </div>

          {/* 📂 Company */}
          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* 🛒 Categories */}
          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">Categories</h6>
            <ul className="list-unstyled">
              <li>Food</li>
              <li>Electronics</li>
              <li>Groceries</li>
              <li>Offers</li>
            </ul>
          </div>

          {/* 📱 Contact */}
          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="small mb-1">📍 Gurgaon, India</p>
            <p className="small mb-1">📞 +91 9876543210</p>
            <p className="small">✉ support@emart.com</p>
          </div>

        </div>

        {/* 🔻 Divider */}
        <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

        {/* 🔻 Bottom */}
        <div className="text-center pb-3">
          <small>© 2026 E-Mart. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;