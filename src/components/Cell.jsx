export const Cell = () => {
  const boardSize = (size = 4) => {
    return Array.from({ length: size * size }).map((_,i) => (
      <div key={i} className="cell"></div>
    ));
  };
  return boardSize();
};
