const utils = require("../utils.js");

const input = utils.lines("input.txt");

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

const start = Date.now();

const maxLength = input.length;

// Record - card index: number of cards
let stack = {};

utils.range(maxLength, 1).forEach((idx) => (stack[idx] = 1));

input.forEach((line, idx) => {
  let gameIndex = idx + 1;
  let [_, record] = line.split(": ");
  let [winningNumbers, myNumbers] = record.split(" | ");
  let winners = winningNumbers
    .split(" ")
    .filter((s) => s)
    .map((s) => parseInt(s));

  const wins = myNumbers
    .split(" ")
    .map((s) => s && parseInt(s))
    .filter((n) => winners.includes(n)).length;

  let executions = stack[gameIndex];

  for (let i = 0; i < executions; i++) {
    for (let j = 0; j < wins; j++) {
      let target = j + gameIndex + 1;
      if (target <= maxLength) {
        stack[target] += 1;
      }
    }
  }
});

const solution = Object.values(stack).reduce((acc, cur) => acc + cur, 0);

console.log(solution);

const end = Date.now();
console.log(`Execution time: ${end - start} ms`);
