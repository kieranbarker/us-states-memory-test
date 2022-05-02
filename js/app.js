import states from "./states.js";

const count = document.querySelector("#count");
const form = document.querySelector("form");
const input = document.querySelector("#guess");
const guessList = document.querySelector("#guess-list");

const prevGuesses = [];

function handleSubmit(event) {
  event.preventDefault();

  const guess = input.value.toLowerCase().trim();
  if (!states.includes(guess) || prevGuesses.includes(guess)) return;

  const listItem = document.createElement("li");
  listItem.textContent = guess;

  guessList.append(listItem);
  count.textContent -= 1;

  input.focus();
  input.value = "";
  prevGuesses.push(guess);
}

form.addEventListener("submit", handleSubmit);
