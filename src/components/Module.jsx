import React, { useState } from "react";
import data from "../your-impact.json";

export default function Module() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="your-impact-container">
      <h1>Your Impact</h1>
      <div className="impact-layout">
        <div className="impact-titles">
          {data.map((item, index) => (
            <div
              key={index}
              className={`impact-title-card ${selectedItem === index ? "active" : ""}`}
              onClick={() => setSelectedItem(index)} 
            >
              <img src={item.icon} alt="icons" />
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>

        <div className="impact-details">
          {selectedItem !== null ? (
            <>
              <p><strong>Consequence:</strong> {data[selectedItem].consequence}</p>
              <img
                src={data[selectedItem].image}
                alt={data[selectedItem].title}
                className="impact-image"
              />
              <p>
                <strong>Alternative:</strong> {data[selectedItem].alternative}
              </p>
            </>
          ) : (
            <div>
              <h2>Select an item to see the details.</h2>
              <img src="../img/empty-jar.png" alt="empty jar with water" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}