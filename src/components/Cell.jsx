import { useState, useEffect } from "react";
import { Tile } from "./tile";

export const Cell = ({ radius }) => {
  const [cells, setCells] = useState([]);
  const [cellsByColumn, setCellsByColumn] = useState([]);
  const [cellsByRow, setCellsByRow] = useState([]);

  const byRow = () => {
    const newCells = cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
    setCellsByRow(newCells);
  };
  const byColumn = () => {
    const newCells = cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
    setCellsByColumn(newCells);
  };

  useEffect(() => {
    const boardFill = () => {
      return Array.from({ length: radius * radius }).map((_, i) => {
        return {
          key: i,
          x: i % radius,
          y: Math.floor(i / radius),
          value: 0,
          tile: null,
        };
      });
    };
    setCells(boardFill());
  }, [radius]);

  useEffect(() => {
    byColumn();
    byRow();
  }, [cells]);

  return (
    <>
      {cells.map((e) => (
        <div key={e.key} className="cell"></div>
      ))}
      <Tile
        radius={radius}
        cells={cells}
        cellsByColumn={cellsByColumn}
        cellsByRow={cellsByRow}
      ></Tile>
    </>
  );
};
