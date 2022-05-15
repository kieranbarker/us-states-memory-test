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

export { toTitleCase };
