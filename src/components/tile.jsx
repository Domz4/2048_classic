import { useEffect } from "react";
import _ from "lodash";
export const Tile = ({
  radius,
  cells,
  cellsByColumn,
  cellsByRow,
  setCells,
}) => {
  useEffect(() => {
    createTiles(cells);
  }, []);
  console.log(cells, "cells");
  const createTiles = (cells) => {
    const zeroCells = cells.filter((e) => e.value === 0);
    const randomCells = _.sampleSize(zeroCells, 2);
    const updatedCells = cells.map((cell) => {
      if (randomCells.includes(cell)) {
        return { ...cell, value: _.sample([2, 4]) };
      }
      return cell;
    });
    console.log(cells);
    setTimeout(() => {
      let newTiles = updatedCells
        .filter((cell) => cell.value !== 0)
        .map((e) => {
          const tileStyles = {
            backgroundColor: `hsl(356, 100%, ${100 - Math.log2(e.value) * 9}%)`,
            color: `hsl(354, 100%, ${100 - (100 - Math.log2(e.value) * 9)}%)`,
            width: `${60 / radius}vmin`,
            height: `${60 / radius}vmin`,
            top: `${e.y * (8 / radius + 60 / radius) + 8 / radius}vmin`,
            left: `${e.x * (8 / radius + 60 / radius) + 8 / radius}vmin`,
          };
          const tileProps = {
            x: e.x,
            y: e.y,
            style: tileStyles,
            value: e.value,
            key: e.key,
          };
          return (e.tile = tileProps);
        });
      console.log(newTiles);
      setCells(newTiles);
    }, 500);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleSlide, { once: true });

    return () => {
      window.removeEventListener("keydown", handleSlide, { once: true });
    };
  });
  function handleSlide(e) {
    switch (e.key) {
      case "ArrowUp":
        tileMoves(cellsByColumn);
        break;
      case "ArrowDown":
        tileMoves(cellsByColumn.map((column) => [...column].reverse()));
        break;
      case "ArrowLeft":
        tileMoves(cellsByRow);
        break;
      case "ArrowRight":
        tileMoves(cellsByRow.map((row) => [...row].reverse()));
        break;
      default:
        document.addEventListener("keydown", handleSlide, { once: true });
        return;
    }
    document.addEventListener("keydown", handleSlide, { once: true });
  }
  function tileMoves(cellsBy) {
    cellsBy.forEach((e) => {
      for (let i = 1; i < e.length; i++) {
        const cell = e[i];
        if (cell.tile == null) continue;
        let lastValid;
        for (let j = i - 1; j >= 0; j--) {
          const aboveCell = e[j];

          if (
            !cell.tile == null ||
            (cell.tile.merge == null && aboveCell.value === cell.tile.value)
          )
            break;
          lastValid = aboveCell;
        }
        if (lastValid != null) {
          if (lastValid.tile != null) {
            lastValid.merge = cell.tile;
          } else {
            lastValid.tile = cell.tile;
            console.log(lastValid, "lastvalid");
            const updatedTiles = cells.map((e) => {
              console.log(e, "e");
              if (lastValid.tile.key === e.key) {
                return { ...e, x: lastValid.x, y: lastValid.y };
              }
              return e;
            });
            console.log(updatedTiles);
          }
        }
      }
    });
  }
  return (
    <>
      {cells.map((e) => {
        return (
          <div className="tile" style={e.style} key={e.key}>
            {e.value}
          </div>
        );
      })}
    </>
  );
};
