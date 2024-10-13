import React, { useState, useEffect } from "react";
import "./winnerStyles.css";

import angry from "../img/angry.png";
import elated from "../img/elated.png";
import french from "../img/french.png";
import happy from "../img/happy.png";
import sherlock from "../img/sherlock.png";

const Winner = () => {
  const [winner, setWinner] = useState({
    maxVotes: 0,
    winnerEm: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  const updateWinner = () => {
    const emojiCounter = localStorage.getItem("emojiCounter");

    if (emojiCounter) {
      const parsedCounter = JSON.parse(emojiCounter);
      if (typeof parsedCounter === "object" && parsedCounter !== null) {
        let maxVotes = 0;
        let winnerEm = "";

        Object.entries(parsedCounter).forEach(([key, value]) => {
          if (value > maxVotes) {
            maxVotes = value;
            winnerEm = key;
          }
        });
        setWinner({ maxVotes, winnerEm });
      }
    }
  };

  //const [winner, setWinner] = useState(updateWinner)

  useEffect(() => {
    updateWinner();
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
    updateWinner();
  };

  const emojiImages = {
    angry,
    elated,
    french,
    happy,
    sherlock,
  };

  return (
    <div className="winner-container">
      <div className="center-container">
        <button className="button primary" onClick={toggleVisibility}>
          {isVisible ? "Hide & Update" : "Show"} Winner
        </button>
      </div>
      {isVisible && (
        <div>
          <h2 className="winner-title">Winner</h2>
          {winner.maxVotes === 0 ? (
            <p>No results available</p>
          ) : (
            <>
              <img
                className="winner-img"
                src={emojiImages[winner.winnerEm]}
                alt={winner.winnerEm}
              />
              <p className="winner-votes-num">
                Number of votes: {winner.maxVotes}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Winner;
