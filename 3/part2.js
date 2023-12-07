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

const specialSymbolRegex = /\*/g;

// Add a surrounding "box" of coordinates
function addAdjacent(inX, inY) {
  let key = `${inX}_${inY}`;
  for (let x = inX - 1; x <= inX + 1; x++) {
    for (let y = inY - 1; y <= inY + 1; y++) {
      symbolAffectedCoords.push({ x, y, key });
    }
  }
}

// Check if given coord is in symbolAffectedCoords array
function coordsContain(x, y) {
  return symbolAffectedCoords.find((obj) => obj.x == x && obj.y == y);
}

// Get range of numbers
function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function addNumberToGear(key, number) {
  symbolAffectedCoords = symbolAffectedCoords.map((gear) => {
    if (gear.key == key) {
      console.log("adding", number, gear);
      gear.numbers = !gear.numbers
        ? new Set([number])
        : new Set([...gear.numbers, number]);
    }
    return gear;
  });
}

// First pass. Fill "symbolAffectedCoords" array with positions which are affected
example.forEach((line, lineNr) => {
  line.split("").forEach((char, charIndex) => {
    if (char.match(specialSymbolRegex)) {
      addAdjacent(lineNr, charIndex);
    }
  });
});

let result = 0;

// Second pass. For each line, extract number, check its position against symbolAffectedCoords
example.forEach((line, lineNr) => {
  let pattern = /\d+/g;

  while ((match = pattern.exec(line))) {
    let nr = match[0];

    range(nr.length).forEach((i) => {
      let cc = coordsContain(lineNr, match.index + i);
      if (cc) {
        console.log("cc", cc);
        addNumberToGear(cc.key, nr);
      }
    });
  }
});

console.log(symbolAffectedCoords);

let result2 = symbolAffectedCoords
  .filter((coord) => coord.numbers.size == 2)
  .flatMap((coord) => coord.numbers);
console.log(result2);
// 539590
