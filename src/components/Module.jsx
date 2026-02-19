import React from "react";
import data from "../your-impact.json";

export default function Module() {
    return (
        <div className="your-impact-container">
          <h1>Your Impact</h1>
          <div className="impact-cards">
            {data.map((item, index) => (
              <div key={index} className="impact-card">
                <img src={item.image} alt={item.title} className="impact-image" />
                <h2>{item.title}</h2>
                <p><strong>Consequence:</strong> {item.consequence}</p>
                <p><strong>Alternative:</strong> {item.alternative}</p>
              </div>
            ))}
          </div>
        </div>
      );
}