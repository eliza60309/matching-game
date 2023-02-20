import React from "react";
import CanvasElement from "./components/canvas";
import './App.css';


function App() {
  return (
    <div className="App"
    style={{
      width: "100%",
      height: "100vh",
    }}
    >
      <title>Matching Game</title>
      {/*<a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">
        Maps and location icons created by Freepik - Flaticon
  </a>*/}
      <CanvasElement
        width={"100%"} //800
        height={"100%"} //800
        color={"pink"}
      />
    </div>
  );
}

export default App;
