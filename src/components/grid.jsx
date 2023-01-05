import { useState } from "react";
import { Cell } from "./Cell";

export const Grid = () => {
  const [renderGame, setRenderGame] = useState(true);
  const [radius, setRadius] = useState(4);
  const handleGameRadius = (e) => {
    setRadius(e.target.value);
  };
  const handleStart = () => {
    setRenderGame(false);
  };
  const girdStyle = {
    display: `grid`,
    gridTemplateColumns: `repeat(${radius}, ${60 / radius}vmin)`,
    gridTemplateRows: `repeat(${radius}, ${60 / radius}vmin)`,
    gap: `${8 / radius}vmin`,
    padding: `${8 / radius}vmin`,
  };
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
    <div style={girdStyle} className="grid">
      <Cell radius={radius}></Cell>
    </div>
  );
};
