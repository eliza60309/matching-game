import React, { useEffect } from "react";
import CanvasElement from "./components/canvas";
import './App.css';


function App() {
  useEffect(() => {
    document.title = 'Matching Game';
  }, []);
  return (
    <div className="App"
    style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "pink"
    }}
    >
      {/*<a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">
        Maps and location icons created by Freepik - Flaticon
  </a>*/}
      <CanvasElement
        width={400} //800
        height={"100vh"} //800
        color={"pink"}
      />
    </div>
  );
}

export default App;
