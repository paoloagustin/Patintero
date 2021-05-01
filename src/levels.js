import Basicy from "/src/basicy";

export function buildlevel(game, level) {
  let basicy = [];

  level.forEach((row, rowIndex) => {
    let position = {
      x: level[rowIndex][0],
      y: level[rowIndex][1]
    };
    let speed = {
      x: level[rowIndex][2],
      y: level[rowIndex][3]
    };
    basicy.push(new Basicy(game, position, speed));
  });

  return basicy;
}

export const level1 = [
  [302, 30, 0, -12.5],
  [600, 10, 0, -19],
  [900, 70, 0, 28],
  [1200, 200, 0, -17],

  [369, 0, 13, 0],
  [420, 225, 15, 0],
  [1000, 500, -50, 0]
];
