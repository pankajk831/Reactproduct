import React from "react";

const Hello = ({ name = "User" }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Hello, {name} 👋</h1>
      <p style={styles.text}>Welcome to your React app 🚀</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#333",
  },
  text: {
    color: "#666",
  },
};

export default Hello;