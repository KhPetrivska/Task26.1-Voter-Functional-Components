import React, { useState, useEffect } from "react";

import angryEm from "../img/angry.png";
import elatedEm from "../img/elated.png";
import frenchEm from "../img/french.png";
import happyEm from "../img/happy.png";
import sherlockEm from "../img/sherlock.png";
import "./emojiesStyles.css";

const Emojies = () => {
  const savedCounts = localStorage.getItem("emojiCounter");
  const count =
    !savedCounts || savedCounts === "undefined"
      ? {
          angry: 0,
          elated: 0,
          french: 0,
          happy: 0,
          sherlock: 0,
        }
      : JSON.parse(savedCounts);

  const [counter, setCounter] = useState(count);

  useEffect(() => {
    localStorage.setItem("emojiCounter", JSON.stringify(counter));
  }, [counter]);

  const increment = (emoji) => {
    setCounter((prevCounter) => ({
      ...prevCounter,
      [emoji]: prevCounter[emoji] + 1,
    }));
  };

  const clearResults = () => {
    const newcount = {
      angry: 0,
      elated: 0,
      french: 0,
      happy: 0,
      sherlock: 0,
    };
    setCounter(newcount);
    localStorage.setItem("emojiCounter", JSON.stringify(newcount));
  };

  const smiles = [
    { name: "angry", src: angryEm },
    { name: "elated", src: elatedEm },
    { name: "french", src: frenchEm },
    { name: "happy", src: happyEm },
    { name: "sherlock", src: sherlockEm },
  ];

  return (
    <>
      <div className="em-container">
        {smiles.map(({ name, src }) => {
          return (
            <div key={name} className="em-counter-img">
              <img
                onClick={() => increment(name)}
                className="em-img"
                src={src}
              />
              <span className="em-counter">
                <p>{counter[name]}</p>
              </span>
            </div>
          );
        })}
      </div>
      <div className="secondary-button-container">
        <button className="secondary button" onClick={clearResults}>
          Clear results
        </button>
      </div>
    </>
  );
};

export default Emojies;
