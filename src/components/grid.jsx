import { useState } from "react";
import { Cell } from "./Cell";

export const Grid = () => {
  const [initalRender, setInitialRender] = useState(false);
  const [radius, setRadius] = useState(4);
  const handleGameRadius = (e) => {
    setRadius(e.target.value);
  };

  const girdStyle = {
    display: `grid`,
    gridTemplateColumns: `repeat(${radius}, ${60 / radius}vmin)`,
    gridTemplateRows: `repeat(${radius}, ${60 / radius}vmin)`,
    gap: `${8 / radius}vmin`,
    padding: `${8 / radius}vmin`,
  };
  return initalRender ? (
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
        <button onClick={() => setInitialRender(!initalRender)}>Start</button>
      </div>
    </>
  ) : (
    <div style={girdStyle} className="grid">
      <Cell radius={radius}></Cell>
    </div>
  );
};
