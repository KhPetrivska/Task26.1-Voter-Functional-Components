import React from "react";
import reactDom from "react-dom";

import angryEm from "../img/angry.png";
import elatedEm from "../img/elated.png";
import frenchEm from "../img/french.png";
import happyEm from "../img/happy.png";
import sherlockEm from "../img/sherlock.png";
import "./emojiesStyles.css";

export default class Emojies extends React.Component {
  constructor(props) {
    super(props);
    const savedCounts = localStorage.getItem("emojiCounter");
    const count = savedCounts
      ? JSON.parse(savedCounts)
      : {
          angry: 0,
          elated: 0,
          french: 0,
          happy: 0,
          sherlock: 0,
        };
    this.state = { count };
  }

  onClick = (emoji) => {
    this.setState(
      (prevState) => ({
        count: { ...prevState.count, [emoji]: prevState.count[emoji] + 1 },
      }),
      () => {
        localStorage.setItem("emojiCounter", JSON.stringify(this.state.count));
      }
    );
  };
  clearResults = () => {
    const newCount = {
      angry: 0,
      elated: 0,
      french: 0,
      happy: 0,
      sherlock: 0,
    };
    this.setState({ count: newCount }, () => {
      localStorage.setItem("emojiCounter", JSON.stringify(newCount));
    });
  };

  render() {
    const smiles = [
      { name: "angry", src: angryEm },
      { name: "elated", src: elatedEm },
      { name: "french", src: frenchEm },
      { name: "happy", src: happyEm },
      { name: "sherlock", src: sherlockEm },
    ];
    // this.state = {
    //   count: smiles.reduce((prevCount, { name }) => {
    //     prevCount[name] = 0;
    //     return prevCount;
    //   }, {}),
    // };

    return (
      <>
        <div className="em-container">
          {smiles.map(({ name, src }) => {
            return (
              <div key={name} className="em-counter-img">
                <img
                  onClick={() => this.onClick(name)}
                  className="em-img"
                  src={src}
                />
                <span className="em-counter">
                  <p>{this.state.count[name]}</p>
                </span>
              </div>
            );
          })}
        </div>
        <div className="secondary-button-container">
          <button className="secondary button" onClick={this.clearResults}>
            Clear results
          </button>
        </div>
      </>
    );
  }
}
