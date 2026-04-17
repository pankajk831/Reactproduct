import { Link, useNavigate } from "react-router-dom";

const Navbarmenu = () => {

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const auth = storedUser && (storedUser.firstName || storedUser.username)
    ? storedUser
    : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: "linear-gradient(45deg, #1e7e34, #3f7e93)", // ✅ Green theme (hero match)
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}
    >
      <div className="container">

        {/* 🔥 LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "white",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px"
            }}
          >
            🛒
          </div>

          <span style={{ fontSize: "20px", letterSpacing: "1px", color: "white" }}>
            E-Mart
          </span>

        </Link>

        {/* 🔥 TOGGLE */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔥 MENU */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-lg-3">

            {/* HOME */}
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold text-white"
                to="/"
                onMouseEnter={(e) => e.target.style.color = "#ffd43b"}
                onMouseLeave={(e) => e.target.style.color = "white"}
              >
                Home
              </Link>
            </li>

            {/* CATEGORY */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fw-semibold text-white"
                to="#"
                data-bs-toggle="dropdown"
                onMouseEnter={(e) => e.target.style.color = "#ffd43b"}
                onMouseLeave={(e) => e.target.style.color = "white"}
              >
                Categories
              </Link>

              <ul className="dropdown-menu shadow border-0 rounded-3 mt-2">
                <li><Link className="dropdown-item" to="/Recipe">🍔 Meals</Link></li>
                <li><Link className="dropdown-item" to="/Electronic">💄 Beauty</Link></li>
                <li><Link className="dropdown-item" to="/Mobiles">📱 Mobiles</Link></li>
                <li><Link className="dropdown-item" to="/Groceries">🛒 Groceries</Link></li>
                <li><Link className="dropdown-item" to="/Kitchenaccessories">🍽️ Kitchen</Link></li>
                <li><Link className="dropdown-item" to="/Electronic2">📦 Other</Link></li>
              </ul>
            </li>

            {/* CART */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fw-semibold text-white"
                to="#"
                data-bs-toggle="dropdown"
                onMouseEnter={(e) => e.target.style.color = "#ffd43b"}
                onMouseLeave={(e) => e.target.style.color = "white"}
              >
                🛒 Cart
              </Link>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
                <li><Link className="dropdown-item" to="/Carts">View Cart</Link></li>
                <li><Link className="dropdown-item" to="/Oders">Orders</Link></li>
              </ul>
            </li>

            {/* ABOUT */}
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold text-white"
                to="/about"
                onMouseEnter={(e) => e.target.style.color = "#ffd43b"}
                onMouseLeave={(e) => e.target.style.color = "white"}
              >
                About
              </Link>
            </li>

            {/* 🔥 USER */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              {auth ? (
                <div className="d-flex align-items-center gap-2 bg-white px-2 py-1 rounded-pill shadow-sm">

                  <img
                    src={auth?.image || "https://i.pravatar.cc/40"}
                    alt="user"
                    className="rounded-circle"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover"
                    }}
                  />

                  <span className="fw-semibold small text-dark">
                    {auth?.firstName || auth?.username}
                  </span>

                  <button
                    className="btn btn-danger btn-sm rounded-pill px-2 py-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <Link
                  className="btn btn-light fw-semibold rounded-pill px-3 shadow-sm"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarmenu;