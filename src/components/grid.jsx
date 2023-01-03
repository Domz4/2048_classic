import { useState } from "react";
import { Cell } from "./Cell";
import { Tile } from "./tile";

export const Grid = () => {
  const [renderGame, setRenderGame] = useState(true);
  const [radius, setRadius] = useState(4);
  const handleGameRadius = (e) => {
    setRadius(e.target.value);
  };
  const handleStart = () => {
    setRenderGame(false);
  };
  console.log(renderGame.current, radius);
  return renderGame ? (
    <>
      <div className="welcome_screen">
        <h1>Select game size: {radius}</h1>
        <input
          type="range"
          min="2"
          max="12"
          value={radius}
          onChange={handleGameRadius}
        />
        <button onClick={handleStart}>Start</button>
      </div>
    </>
  ) : (
    <div className="grid">
      <Cell></Cell>
      <Tile radius={radius}></Tile>
    </div>
  );
};
