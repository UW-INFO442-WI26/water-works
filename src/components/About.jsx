import React from "react";

export default function About() {
  return (
    <div className="your-impact-container">
      <div className="your-impact-header">
        <img 
          src="https://img.icons8.com/?size=100&id=10087&format=png&color=000000" 
          alt="about icon" 
        />
        <h1 className="primary-header">About Water Works.</h1>
        <h1><b>Know before you go.</b></h1>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            <p className="lead text-center mb-5">
              Protect the waters you're surrounded by.
            </p>

            <section className="mb-5">
              <h3 className="mb-3">Our Mission</h3>
              <p>
                Water Works was created to make wastewater information more
                accessible, understandable, and actionable for Seattle's
                recreational water users. Combined Sewer Overflow (CSO) events
                can impact water quality and public health, but existing tools
                often feel technical or overwhelming.
              </p>
              <p>
                Our goal is to bridge that gap by providing clear safety
                indicators, personalized notifications, and educational
                resources that empower individuals to make informed decisions.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="mb-3">Why We Built This</h3>
              <p>
                Many Seattle residents rely on nearby waterways for kayaking,
                fishing, swimming, and shoreline activities. However, checking
                whether it's safe can be confusing and time-consuming.
              </p>
              <p>
                We designed Water Works with a mobile-first mindset to ensure
                that users can quickly check water conditions, understand risks,
                and take appropriate action — even when making last-minute plans.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="mb-3">Who We Serve</h3>
              <div className="consequence-bubble">
                <ul className="mb-0">
                  <li className="mb-2">
                    Recreational users who need fast, clear answers about water
                    safety.
                  </li>
                  <li className="mb-2">
                    Environmental advocates tracking overflow patterns and
                    community impact.
                  </li>
                  <li className="mb-2">
                    Residents who want to better understand how everyday habits
                    affect local water systems.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-5">
              <h3 className="mb-3">Our Approach</h3>
              <p>
                We focus on clarity, accessibility, and personalization. By
                combining interactive mapping, location-based alerts, and
                educational modules, we aim to support both immediate safety
                decisions and long-term environmental awareness.
              </p>
            </section>

            <section className="mb-5">
              <h3 className="mb-3">Meet the Team</h3>
              <div className="consequence-bubble">
                <p className="mb-2">Water Works was developed by students in INFO 442:</p>
                <ul className="mb-0">
                  <li className="mb-1">Jacob Waltzer</li>
                  <li className="mb-1">Justin Mai</li>
                  <li className="mb-1">Hieu Le</li>
                  <li className="mb-1">Noah Pak</li>
                  <li className="mb-1">Hannah Wee</li>
                  <li className="mb-1">Willy Dang</li>
                </ul>
              </div>
            </section>

            {/* Back to Home Button */}
            <div className="text-center mt-5">
              <a href="/" className="btn btn-outline-primary">
                ← Back to Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}