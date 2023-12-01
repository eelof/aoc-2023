const utils = require("../utils.js");

const input = utils.lines("input.txt");

const solution = input
  .map((line) => {
    const digits = line.replaceAll(/[^\d]/g, "");
    let result = [];
    result.push(digits[0]);

    if (digits.length > 1) {
      result.push(digits[digits.length - 1]);
    } else {
      result.push(digits[0]);
    }

    return result;
  })
  .flatMap((num) => {
    return num[0] + "" + num[1];
  })
  .map((n) => parseInt(n))
  .reduce((prev, cur) => prev + cur, 0);

console.log(solution);
