import React, { Component } from "react";
import "./App.css";

import Game from "./components/Game";
import { initialState } from "./../src/components/Game/state";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Game game={initialState} />
      </div>
    );
  }
}

export default App;
