const utils = require("../utils.js");

// CBA To parse strings
const input = [[59688274, 543102016641022]].map(([time, distance]) => ({
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
