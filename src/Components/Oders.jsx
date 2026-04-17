import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2 className="fw-bold">🛒 No Orders Yet</h2>
        <p className="text-muted">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="fw-bold mb-4 text-center">📦 My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="card shadow-sm mb-4 border-0">

          {/* Top Bar */}
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">ORDER ID</small><br />
              <strong>{order.id}</strong>
            </div>

            <div>
              <small className="text-muted">DATE</small><br />
              <strong>{order.date}</strong>
            </div>

            <div>
              <small className="text-muted">PAYMENT</small><br />
              <span className="badge bg-success">Paid</span>
            </div>
          </div>

          {/* Items */}
          <div className="card-body">

            {order.items.map((item, index) => (
              <div 
                key={index} 
                className="row align-items-center mb-3 border-bottom pb-3"
              >

                {/* Image */}
                <div className="col-md-2 col-4">
                  <img
                    src={item.thumbnail}
                    className="img-fluid rounded"
                    alt=""
                  />
                </div>

                {/* Details */}
                <div className="col-md-6 col-8">
                  <h6 className="mb-1">{item.title}</h6>
                  <p className="text-muted mb-1">
                    Quantity: {item.quantity}
                  </p>
                  <small className="text-success fw-bold">
                    Delivered
                  </small>
                </div>

                {/* Price */}
                <div className="col-md-2 text-end">
                  ${item.price}
                </div>

                {/* Total */}
                <div className="col-md-2 text-end fw-bold">
                  ${item.price * item.quantity}
                </div>

              </div>
            ))}

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center mt-3">

              <div>
                <small className="text-muted">Payment ID</small><br />
                <strong>{order.paymentId}</strong>
              </div>

              <div className="text-end">
                <h5 className="mb-0">Total</h5>
                <h4 className="text-success">${order.total}</h4>
              </div>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default Orders;