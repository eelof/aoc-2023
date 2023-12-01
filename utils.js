const fs = require("fs");

module.exports = {
  lines: (filename) => {
    return fs.readFileSync("./input.txt", "utf-8").split("\n");
  },
};
