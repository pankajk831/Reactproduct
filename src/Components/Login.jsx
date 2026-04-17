import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ onLogin }) {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === username)) {
      toast.error(" ⚠️Username already exists");
      return;
    }  

    const newUser = {
      username,
      password,
      phoneno,
      address,
      image: image || "https://i.pravatar.cc/150"
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("user", JSON.stringify(newUser));

    if (onLogin) onLogin(newUser);
    navigate(from, { replace: true });
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (onLogin) onLogin(user);
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* 🔥 LEFT SIDE (IMAGE) */}
        <div
          className="col-md-7 d-none d-md-flex align-items-end text-white p-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)"
            }}
          ></div>

          <div className="position-relative">
            <h2 className="fw-bold">Edit Smarter. Export Faster.</h2>
            <p>Create Anywhere. Premium Experience.</p>
          </div>
        </div>

        {/* 🔥 RIGHT SIDE (FORM) */}
        <div className="col-md-5 d-flex justify-content-center align-items-center bg-light">

          <div
            className="p-4 shadow"
            style={{
              width: "350px",
              borderRadius: "15px",
              background: "white"
            }}
          >

            <h3 className="fw-bold mb-2">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h3>

            <p className="text-muted small mb-4">
              {isLogin
                ? "Login to continue shopping"
                : "Register to start shopping"}
            </p>

            <form onSubmit={isLogin ? handleLogin : handleRegister}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              {!isLogin && (
                <>
                  <input
                    type="tel"
                    className="form-control mb-3"
                    placeholder="Phone"
                    value={phoneno}
                    onChange={e => setPhone(e.target.value)}
                  />

                  <textarea
                    className="form-control mb-3"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />

                  <input
                    type="file"
                    className="form-control mb-3"
                    onChange={handleImage}
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </>
              )}

              <button className="btn btn-dark w-100">
                {isLogin ? "Login" : "Register"}
              </button>

            </form>

            <p className="text-center mt-3 small">
              {isLogin ? "No account?" : "Already have account?"}
              <span
                onClick={toggleForm}
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {isLogin ? " Register" : " Login"}
              </span>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;