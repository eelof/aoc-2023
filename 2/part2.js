const utils = require("../utils.js");

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

const input = utils.lines("input.txt");

const solution = input
  .map((line) => {
    const [_, revelationString] = line.split(": ");
    const revelations = revelationString.split("; ");

    let result = {
      red: 1,
      green: 1,
      blue: 1,
    };

    revelations.forEach((revelation) => {
      revelation.split(", ").forEach((part) => {
        const amount = parseInt(part.split(" ")[0]);
        const color = part.split(" ")[1];

        if (amount > result[color]) {
          result[color] = amount;
        }
      });
    });

    return result;
  })
  .map((game) => {
    return Object.values(game).reduce((prev, cur) => prev * cur, 1);
  })
  .reduce((prev, cur) => prev + cur, 0);

console.log(solution);
