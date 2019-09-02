import React from "react";
import ReactDOM from "react-dom";

import "./App.scss";

import Gamebox from "./components/Gamebox";

const App = () => {
  return (
    <div>
      <div>Hello React!!</div>
      <Gamebox />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
