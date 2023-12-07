const utils = require("../utils.js");

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split("\n");

const input = utils.lines("input.txt");

let symbolAffectedCoords = [];

const specialSymbolRegex = /[^\d. ]/g;

// Add a surrounding "box" of coordinates
function addAdjacent(inX, inY, char) {
  for (let x = inX - 1; x <= inX + 1; x++) {
    for (let y = inY - 1; y <= inY + 1; y++) {
      symbolAffectedCoords.push({ x, y });
    }
  }
}

// Check if given coord is in symbolAffectedCoords array
function coordsContain(x, y) {
  return symbolAffectedCoords.some((obj) => obj.x == x && obj.y == y);
}

// Get range of numbers
function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

// First pass. Fill "symbolAffectedCoords" array with positions which are affected
input.forEach((line, lineNr) => {
  line.split("").forEach((char, charIndex) => {
    if (char.match(specialSymbolRegex)) {
      addAdjacent(lineNr, charIndex, char);
    }
  });
});

let result = 0;

// Second pass. For each line, extract number, check its position against symbolAffectedCoords
input.forEach((line, lineNr) => {
  let pattern = /\d+/g;

  while ((match = pattern.exec(line))) {
    let nr = match[0];
    if (range(nr.length).some((i) => coordsContain(lineNr, match.index + i))) {
      result += parseInt(nr);
    }
  }
});

console.log("solution is", result);
// 539590
