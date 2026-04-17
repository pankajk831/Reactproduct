import React from "react";

const Card = ({ title, description, bgcolor }) => {
  return (
    <div style={{ 
      backgroundColor: bgcolor, 
      padding: "20px", 
      borderRadius: "10px", 
      width: "200px", 
      margin: "10px" 
    }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;