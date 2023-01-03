export const Cell = ({ radius }) => {
  const boardSize = () => {
    return Array.from({ length: radius * radius }).map((_, i) => (
      <div key={i} className="cell"></div>
    ));
  };
  return boardSize();
};
