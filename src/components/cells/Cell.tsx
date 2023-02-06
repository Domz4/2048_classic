import * as React from "react";
import { FC } from "react";
import { Tile } from "../tile/tile";

interface Props {
  size: number;
}

export const Cell: FC<Props> = ({ size }) => {
  return (
    <>
      {Array.from({ length: size * size }).map((_, idx) => (
        <div key={idx} className="cell"></div>
      ))}
      <Tile size={size}></Tile>
    </>
  );
};
