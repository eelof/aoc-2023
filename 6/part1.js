const utils = require("../utils.js");

// CBA To parse strings

const example = [
  [7, 9],
  [15, 40],
  [30, 200],
].map(([time, distance]) => ({
  time,
  distance,
}));

const input = [
  [59, 543],
  [68, 1020],
  [82, 1664],
  [74, 1022],
].map(([time, distance]) => ({
  time,
  distance,
}));

const getDistances = ({ time, distance }) => {
  let wins = 0;
  for (let i = 0; i <= time; i++) {
    let result = (time - i) * i;
    //console.log(`button held for ${i} ms. distance = ${result}`);
    if (result > distance) {
      wins += 1;
    }
  }

  return wins;
};

const solution = input
  .map(getDistances)
  .reduce((cur, acc) => (cur == 0 ? 1 : cur * acc), 1);
console.log(solution);
