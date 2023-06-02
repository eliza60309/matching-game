import React, { useEffect } from "react";
import MatchingGame from "./components/matching-game";
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
      backgroundColor: "lightgreen"
    }}
    >
      {/*<a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">
        Maps and location icons created by Freepik - Flaticon
  </a>*/}
      <button></button>
      <MatchingGame
        width={400} //800
        height={800} //800
        color={"pink"}
        renderMode={"all"}
      />
    </div>
  );
}

export default App;
