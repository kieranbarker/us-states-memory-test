/**
 * Randomly shuffle an array.
 * https://stackoverflow.com/a/2450976/1293256
 * @param {any[]} array The array to shuffle.
 * @returns {any[]} The shuffled array.
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Convert a string to title case.
 * https://gist.github.com/kieranbarker/293b74f1b3b46272315d2e1719786b03
 * @param {string} str The string to convert.
 * @returns {string} The converted string.
 */
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export { shuffle, toTitleCase };
