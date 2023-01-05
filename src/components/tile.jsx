import { useState, useEffect } from "react";

export const Tile = ({ radius, cells, cellsByColumn, cellsByRow }) => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      if (cells.length > 0) {
        let emptyCells = cells.filter((cell) => cell.value === 0);
        if (emptyCells.length > 1) {
          emptyCells[Math.floor(Math.random() * emptyCells.length)].value =
            Math.random() > 0.5 ? 2 : 4;
        }
      }
    }
    handleCreateTiles(cells);
  }, [cells]);

  const handleCreateTiles = (cells) => {
    setTimeout(() => {
      let activeTiles = cells
        .filter((cell) => cell.value !== 0)
        .map((e) => {
          const tileStyles = {
            backgroundColor: `hsl(356, 100%, ${100 - Math.log2(e.value) * 9}%)`,
            color: `hsl(354, 100%, ${100 - (100 - Math.log2(e.value) * 9)}%)`,
            width: `${60 / radius}vmin`,
            height: `${60 / radius}vmin`,
            top: `${e.x * (8 / radius + 60 / radius) + 8 / radius}vmin`,
            left: `${e.y * (8 / radius + 60 / radius) + 8 / radius}vmin`,
          };
          const tileProps = {
            x: e.x,
            y: e.y,
            style: tileStyles,
            value: e.value,
            key: e.key,
          };
          e.tile = tileProps;
          return tileProps;
        });
      setTiles(activeTiles);
    }, 500);
  };
  console.log(cells, tiles);
  const slideTiles = (cells) => {
    cells.forEach((group) => {
      for (let i = 0; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile === null) continue;
        let lastValid;
        for (let j = i - 1; j >= 0; j--) {
          if (!group[j]) break;
          lastValid = group[j];
        }
        if (lastValid != null) {
          if (lastValid.tile != null) {
            lastValid.mergeTile = cell.tile;
          } else {
            lastValid.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
    });
  };
  function merge (val) {
    return val == null ? null : 
  }
  function acceptTile(tile) {
    return tile == null;
  }
  return (
    <>
      {tiles.map((e) => {
        return (
          <div className="tile" style={e.style} key={e.key}>
            {e.value}
          </div>
        );
      })}
    </>
  );
};
