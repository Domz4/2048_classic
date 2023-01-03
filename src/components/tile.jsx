import { useState } from "react";

export const Tile = () => {
  const [tileValue, setTileValue] = useState();
  const generateRandom = () => {
    return Math.random();
  };
  const dynamicColor = {
    backgroundColor: `hsl(354, 100%, ${tileValue})`,
  };
  return (
    <>
      <div className="tile" style={dynamicColor}></div>
    </>
  );
};
