import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(Array.isArray(savedCart) ? savedCart : []);
  }, []);

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("🗑️ Item removed");
  };

  // Total
  const totalAmount = cart.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  // Payment
  const handlePayment = () => {
    if (totalAmount <= 0) {
      toast.error("⚠️ Invalid amount");
      return;
    }

    const options = {
      key: "rzp_test_SY7eG8WVt732Lf",
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      name: "E-Mart",
      description: "Order Payment",

      handler: function (response) {
        toast.success("✅ Payment Successful!");

        const newOrder = {
          id: Date.now(),
          items: cart,
          total: totalAmount,
          paymentId: response.razorpay_payment_id,
          date: new Date().toLocaleString()
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

        localStorage.removeItem("cart");
        setCart([]);
        window.location.href = "/orders";
      },

      theme: { color: "#0d6efd" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2 style={{ fontWeight: "600" }}>🛒 Your Cart is Empty</h2>
        <p className="text-muted">Add some products to continue shopping</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      
      {/* Title */}
      <h2 className="mb-4 fw-bold text-center">🛒 Shopping Cart</h2>

      <div className="row">
        
        {/* Left Side - Items */}
        <div className="col-md-8">
          {cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;

            return (
              <div 
                key={item.id + "_" + index}
                className="card mb-3 shadow-sm"
                style={{
                  borderRadius: "15px",
                  border: "none"
                }}
              >
                <div className="row g-0 align-items-center p-3">

                  {/* Image */}
                  <div className="col-md-3 text-center">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="img-fluid"
                      style={{ height: "100px", objectFit: "contain" }}
                    />
                  </div>

                  {/* Details */}
                  <div className="col-md-6">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="mb-1 text-muted">
                      Qty: {item.quantity}
                    </p>
                    <p className="mb-1">
                      Price: <b>${item.price}</b>
                    </p>
                    <p className="text-success fw-bold">
                      Total: ${itemTotal}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="col-md-3 text-end">
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side - Summary */}
        <div className="col-md-4">
          <div 
            className="card p-4 shadow"
            style={{
              borderRadius: "15px",
              border: "none",
              position: "sticky",
              top: "80px"
            }}
          >
            <h4 className="fw-bold mb-3">Order Summary</h4>

            <hr />

            <h5>
              Total: <span className="text-success">${totalAmount}</span>
            </h5>

            <button 
              className="btn btn-success w-100 mt-3"
              style={{
                padding: "10px",
                fontWeight: "600",
                borderRadius: "10px"
              }}
              onClick={handlePayment}
            >
              💳 Pay Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;