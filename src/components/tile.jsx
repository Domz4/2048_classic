import { useState } from "react";

export const Tile = ({ radius }) => {
  const [tileValue, setTileValue] = useState("90%");
  const generateRandom = () => {
    return Math.random();
  };
  const styles = {
    backgroundColor: `hsl(354, 100%, ${tileValue})`,
    width: radius,
    heigh: radius,
  };
  return (
    <>
      <div className="tile" style={styles}></div>
    </>
  );
};
