import "./tile.css";
import * as _ from "lodash";
import { useState, useEffect, useCallback } from "react";
import {
  move,
  sortByRow,
  sortByColumn,
  getTiles,
  getStyles,
  tileType,
} from "../utilis/logic";
import * as React from "react";

interface Props {
  size: number;
}

export const Tile = ({ size }: Props) => {
  const [tiles, setTiles] = useState<tileType[]>([]);

  const updateTiles = useCallback(
    (tiles: tileType[]) => {
      const emptyTiles = tiles.filter((tile) => tile.presence === false);
      const generateRandom = _.sampleSize(emptyTiles, 2);
      const updatedTiles = tiles.map((tile) => {
        // generating random tiles
        for (let i = 0; i < 2; i++) {
          if (generateRandom[i].key === tile.key) {
            let newValue = _.sample([2, 4]) as number;
            return {
              ...tile,
              styles: getStyles(size, tile, newValue),
              value: newValue,
              presence: true,
            };
          }
        }
        return {
          ...tile,
          styles: getStyles(size, tile, tile.value),
        };
      });
      setTiles(updatedTiles);
    },
    [size]
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    let movedTiles;
    switch (e.key) {
      case "ArrowUp":
        const column = sortByColumn(tiles, size);
        movedTiles = move(column, tiles);
        updateTiles(movedTiles);
        break;
      case "ArrowDown":
        const columnReversed = sortByColumn(tiles, size).map((column) =>
          [...column].reverse()
        );
        movedTiles = move(columnReversed, tiles);
        updateTiles(movedTiles);
        break;
      case "ArrowLeft":
        const row = sortByRow(tiles, size);
        movedTiles = move(row, tiles);
        updateTiles(movedTiles);
        break;
      case "ArrowRight":
        const rowReversed = sortByRow(tiles, size).map((row) =>
          [...row].reverse()
        );
        movedTiles = move(rowReversed, tiles);
        updateTiles(movedTiles);
        break;
      default:
        return;
    }
  };
  useEffect(() => {
    const initialize = getTiles(size);
    updateTiles(initialize);
  }, [size, updateTiles]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      {tiles
        .filter((tile) => tile.value !== 0)
        .map((tile) => {
          if (tile.presence) {
            return (
              <div className="tile" style={tile.styles} key={tile.key}>
                {tile.value}
              </div>
            );
          } else {
            return null;
          }
        })}
    </>
  );
};
