import { useState, useEffect } from "react";

export const Cell = ({ radius }) => {
  const [cells, setCells] = useState([]);
  const getRandomCell = () => {
    const emptyCells = cells.filter((cell) => cell.value === 0);
    console.log(emptyCells[Math.floor(Math.random() * emptyCells.length)].value);
  };
  getRandomCell();
  const boardFill = () => {
    const newCells = Array.from({ length: radius * radius }).map((_, i) => {
      return {
        key: i,
        x: i % radius,
        y: Math.floor(i / radius),
        value: 0,
      };
    });
    setCells(newCells);
  };
  useEffect(() => {
    boardFill();
  }, []);
  return (
    <>
      {cells.map((e) => (
        <div
          key={e.key}
          data-x={e.x}
          data-y={e.y}
          data-value={e.value}
          className="cell"
        ></div>
      ))}
    </>
  );
};
