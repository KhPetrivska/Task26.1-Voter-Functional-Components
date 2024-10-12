import React from "react";
import "./winnerStyles.css";

import angry from "../img/angry.png";
import elated from "../img/elated.png";
import french from "../img/french.png";
import happy from "../img/happy.png";
import sherlock from "../img/sherlock.png";

export default class Winner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxVotes: 0,
      winnerEm: "",
      isVisible: false,
    };
  }
  componentDidMount() {
    this.updateWinner(); 
  }
 updateWinner = () => {
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
      this.setState({ maxVotes, winnerEm });
    }
  }
 }
  toggleVisibility = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
    this.updateWinner()
  };

  render() {
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
          <button className="button primary" onClick={this.toggleVisibility}>
            {this.state.isVisible ? "Hide&Update" : "Show"} Winner
          </button>
        </div>
        <div style={{ display: this.state.isVisible ? "" : "none" }}>
          <h2 className="winner-title">Winner</h2>
          {this.state.maxVotes === 0 ? (
            <p>No results available</p>
          ) : (
            <>
              <img
                className="winner-img"
                src={emojiImages[this.state.winnerEm]}
              />
              <p className="winner-votes-num">
                Number of votes: {this.state.maxVotes}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}
