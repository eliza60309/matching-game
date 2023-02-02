import React from "react";
import CanvasElement from "./components/canvas";
import './App.css';


function App() {
  return (
    <div className="App">
      <CanvasElement
        width={800}
        height={800}
        color={"pink"}
      />
    </div>
  );
}

export default App;
