import { useState } from "react";

export const Tile = ({ radius }) => {
  const [tileValue, setTileValue] = useState("95");
  const generateRandom = () => {
    return Math.random();
  };
  const tileStyles = {
    position: `absolute`,
    backgroundColor: `hsl(354, 100%, ${tileValue}%)`,
    color: `hsl(354, 100%, ${100 - tileValue}%)`,
    width: `${60 / radius}vmin`,
    height: `${60 / radius}vmin`,
    top: `${2 * (60 / radius) + 8 / radius}vmin`,
    left: `${2 * (60 / radius) + 8 / radius}vmin`,
  };
  console.log(tileStyles);
  return (
    <>
      <div className="tile" style={tileStyles}>
        2
      </div>
    </>
  );
};
