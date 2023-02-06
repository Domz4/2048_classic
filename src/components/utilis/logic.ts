export interface tileType {
  x: number;
  y: number;
  key: number;
  styles: object;
  value: number;
  presence: boolean;
}

export const getID = () => {
  return Math.random();
};
// seting initial cells

export const getTiles = (size: number) => {
  return Array.from({ length: size * size }).map((_, i): tileType => {
    return {
      x: i % size,
      y: Math.floor(i / size),
      key: getID(),
      styles: {},
      value: 0,
      presence: false,
    };
  });
};

// sorting the grid by column and row, example with 3x3 grid
// by column = [[0,3,6],[1,4,7],[2,5,9]]
// by row = [[0,1,2],[3,4,5],[6,7,8]]

export const sortByRow = (tiles: tileType[], size: number): tileType[][] => {
  return Array.from({ length: size }, (_, idx) =>
    tiles.reduce((acc, curr) => {
      if (curr.y === idx) acc.push(curr);
      return acc;
    }, [] as tileType[])
  );
};

export const sortByColumn = (tiles: tileType[], size: number): tileType[][] => {
  return Array.from({ length: size }, (_, idx) =>
    tiles.reduce((acc, curr) => {
      if (curr.x === idx) acc.push(curr);
      return acc;
    }, [] as tileType[])
  );
};

// styles for tiles
export const getStyles = (size: number, tile: tileType, value: number) => {
  const colors = [
    "#FFEACD",
    "#f3ca74",
    "#f2aa60",
    "#ef915b",
    "#e77059",
    "#d74d5d",
    "#c53662",
    "#bb2967",
    "#b11f69",
    "#a9176e",
    "#8e0674",
    "#760478",
  ];
  const tileStyles = {
    backgroundColor: colors[Math.log2(value) - 1],
    color: value < 256 ? "black" : "white",
    width: `${60 / size}vmin`,
    height: `${60 / size}vmin`,
    top: `${tile.y * (8 / size + 60 / size) + 8 / size}vmin`,
    left: `${tile.x * (8 / size + 60 / size) + 8 / size}vmin`,
  };
  return tileStyles;
};

// logic for moving the tiles

export const move = (tilesBy: tileType[][], tiles: tileType[]) => {
  let shiftedTiles = tiles;
  tilesBy.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      let current = line[i];
      let lastValid: tileType | null = null;
      if (!current.presence) continue;
      for (let j = i - 1; j >= 0; j--) {
        let moveTo = line[j];
        if (!(!moveTo.presence || (moveTo.value === current.value && moveTo.presence))) break;
        lastValid = moveTo;
      }
      if (lastValid != null) {
        console.log(lastValid);
        if (lastValid.presence !== false && lastValid.value === current.value) {
          lastValid.value += current.value;
        } else {
          lastValid.value = current.value;
          lastValid.presence = true;
          lastValid.styles = getStyles(line.length, lastValid, lastValid.value);
        }
        current.presence = false;
        current.value = 0;
        current.styles = {};
        
        shiftedTiles = tiles.map((tile) => {
          return lastValid && tile.key === lastValid.key
            ? lastValid
            : tile.key === current.key
            ? current
            : tile;
        });
      }
    }
  });
  return shiftedTiles;
};
