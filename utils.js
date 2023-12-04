const fs = require("fs");

module.exports = {
  lines: (filename) => {
    return fs.readFileSync("./input.txt", "utf-8").split("\n");
  },
  range: (size, start = 0) => {
    return [...Array(size).keys()].map((i) => i + start);
  },
};
