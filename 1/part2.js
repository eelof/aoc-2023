const { match } = require("assert");
const utils = require("../utils.js");

const input = utils.lines("input.txt");

const NUMBER_DICT = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const buildRegex = () => {
  let wordRegexes = Object.keys(NUMBER_DICT)
    .map((word) => `|${word}|${reverse(word)}`)
    .join("");
  return new RegExp(`/[\\d]|${wordRegexes}`);
};

const replaceWord = (str) => {
  return NUMBER_DICT[str] ?? str;
};

const reverse = (str) => {
  return str.split("").reverse().join("");
};

const getFirstMatch = (line) => {
  const regex = buildRegex();
  return replaceWord(line.match(regex)[0]);
};

const getLastMatch = (line) => {
  return reverse(getFirstMatch(reverse(line)));
};

const solution = input
  .map((line) => {
    const first = getFirstMatch(line);
    const last = getLastMatch(line);

    return replaceWord(first) + replaceWord(last);
  })

  .map((n) => parseInt(n))
  .reduce((n1, n2) => n1 + n2, 0);

console.log(solution);
