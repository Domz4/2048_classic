import "./grid.css";
import * as React from "react";
import { useState } from "react";
import { Cell } from "../cells/Cell";

export const Grid = () => {
  const [initalRender, setInitialRender] = useState(false);
  const [size, setSize] = useState(4);
  const handleGamesize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(e.target.value));
  };

  const girdStyle = {
    gridTemplateColumns: `repeat(${size}, ${60 / size}vmin)`,
    gridTemplateRows: `repeat(${size}, ${60 / size}vmin)`,
    gap: `${8 / size}vmin`,
    padding: `${8 / size}vmin`,
  };
  return initalRender ? (
    <>
      <div className="welcome_screen">
        <h1>Select game size: {size}</h1>
        <input
          type="range"
          min="2"
          max="12"
          value={size}
          onChange={handleGamesize}
        />
        <button onClick={() => setInitialRender(!initalRender)}>Start</button>
      </div>
    </>
  ) : (
    <div style={girdStyle} className="grid">
      <Cell size={size}></Cell>
    </div>
  );
};
