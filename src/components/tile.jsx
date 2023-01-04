import { useState } from "react";

export const Tile = ({ radius }) => {
  const [tileValue, setTileValue] = useState("95");
 
  const x = 1;
  const y = 2;
  const xPos = x * (8 / radius + 60 / radius) + 8 / radius;
  const yPos = y * (8 / radius + 60 / radius) + 8 / radius;
  const tileStyles = {
    position: `absolute`,
    backgroundColor: `hsl(354, 100%, ${tileValue}%)`,
    color: `hsl(354, 100%, ${100 - tileValue}%)`,
    width: `${60 / radius}vmin`,
    height: `${60 / radius}vmin`,
    top: `${xPos}vmin`,
    left: `${yPos}vmin`,
  };
  return (
    <>
      <div className="tile" style={tileStyles}>
        4
      </div>
    </>
  );
};
