import React from "react";

const Card = ({ title, time }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{time}</p>
    </div>
  );
};

export default Card;
