import React, { useEffect, useState } from "react";
import "./App.css";

const brewMethods = {
  Espresso: {
    totalTime: 30,
    price: "₹249",
    subtitle: "Rich • Bold • Intense",

    cover:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",

    recipe: [
      "18g finely ground coffee",
      "36ml espresso yield",
      "Water temperature: 93°C",
      "Extraction time: 30 sec",
    ],

    processImage:
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80",
  },

  "French Press": {
    totalTime: 120,
    price: "₹399",
    subtitle: "Smooth • Full Body • Rich",

    cover:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1200&q=80",

    recipe: [
      "20g coarse coffee grounds",
      "300ml hot water",
      "Steep for 4 minutes",
      "Slowly press plunger",
    ],

    processImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
  },

  "Aero Press": {
    totalTime: 90,
    price: "₹359",
    subtitle: "Clean • Bright • Smooth",

    cover:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80",

    recipe: [
      "17g medium ground coffee",
      "250ml hot water",
      "Stir for 10 seconds",
      "Press slowly for smooth extraction",
    ],

    processImage:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
  },
};

export default function App() {
  const [selectedBrew, setSelectedBrew] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const handleSelect = (brewName) => {
    setSelectedBrew(brewName);

    setTimeLeft(
      brewMethods[brewName].totalTime
    );

    setIsRunning(false);
  };

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);

    const sec = time % 60;

    return `${min}:${
      sec < 10 ? "0" : ""
    }${sec}`;
  };

  const progress = selectedBrew
    ? (
        (
          brewMethods[selectedBrew]
            .totalTime - timeLeft
        ) /
        brewMethods[selectedBrew]
          .totalTime
      ) *
      100
    : 0;

  return (
    <div className="app">

      {/* HERO */}

      <section className="hero">

        <div className="hero-overlay">

          <h1>coffee brew</h1>

          <p>
            Premium Coffee Brew Timer ☕
          </p>

          <button
            onClick={() =>
              document
                .querySelector(".brew-grid")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Menu
          </button>

        </div>

      </section>

      {/* TITLE */}

      <h2 className="section-title">
        Signature Brews
      </h2>

      {/* BREW GRID */}

      <section className="brew-grid">

        {Object.entries(
          brewMethods
        ).map(([name, brew]) => (

          <div
            key={name}
            className={`brew-card ${
              selectedBrew === name
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleSelect(name)
            }
          >

            <img
              src={brew.cover}
              alt={name}
            />

            <div className="brew-overlay">

              <h2>{name}</h2>

              <p>{brew.subtitle}</p>

              <div className="brew-meta">

                <span>
                  ⏱ {brew.totalTime}s
                </span>

                <span className="price">
                  {brew.price}
                </span>

              </div>

            </div>

          </div>
        ))}

      </section>

      {/* BREW EXPERIENCE */}

      {selectedBrew && (

        <section className="brew-experience">

          <img
            className="process-image"
            src={
              brewMethods[selectedBrew]
                .processImage
            }
            alt=""
          />

          <div className="experience-content">

            <div className="order-card">

              <h3>Order #MC1024</h3>

              <p>
                Customer:
                Sahil Ghone
              </p>

            </div>

            <h2>{selectedBrew}</h2>

            <h1>
              {formatTime(timeLeft)}
            </h1>

            {timeLeft === 0 ? (

              <div className="coffee-ready">
                ☕ Coffee Ready to Serve,
                Sahil!
              </div>

            ) : (

              <div className="coffee-making">
                Brewing in Progress...
              </div>

            )}

            {/* CONTROLS */}

            <div className="controls">

              <button
                onClick={() =>
                  setIsRunning(true)
                }
              >
                Start Brewing
              </button>

              <button
                onClick={() =>
                  setIsRunning(false)
                }
              >
                Pause
              </button>

              <button
                onClick={() =>
                  handleSelect(
                    selectedBrew
                  )
                }
              >
                Reset
              </button>

            </div>

            {/* PROGRESS */}

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>

            </div>

            {/* RECIPE */}

            <div className="recipe-section">

              <h3>
                ☕ Brewing Recipe
              </h3>

              <div className="recipe-list">

                {brewMethods[
                  selectedBrew
                ].recipe.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      className={`recipe-item ${
                        progress >
                        (
                          (
                            index +
                            1
                          ) /
                          brewMethods[
                            selectedBrew
                          ].recipe
                            .length
                        ) *
                          100
                          ? "done"
                          : ""
                      }`}
                      key={index}
                    >

                      <span className="recipe-check">

                        {progress >
                        (
                          (
                            index +
                            1
                          ) /
                          brewMethods[
                            selectedBrew
                          ].recipe
                            .length
                        ) *
                          100
                          ? "✓"
                          : "○"}

                      </span>

                      <span className="recipe-text">
                        {item}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </section>

      )}

    </div>
  );
}
