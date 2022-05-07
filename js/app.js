import DOMPurify from "./DOMPurify/purify.es.js";
import states from "./states.js";

const count = document.querySelector("#count");
const form = document.querySelector("form");
const input = document.querySelector("#guess");
const guessList = document.querySelector("#guess-list");

const prevGuesses = [];
const storageKey = "us-states-memory-test";

function setData() {
  localStorage.setItem(storageKey, JSON.stringify(prevGuesses));
}

function getData() {
  const data = JSON.parse(localStorage.getItem(storageKey)) || [];
  prevGuesses.push(...data);

  count.textContent = states.length - prevGuesses.length;
  guessList.innerHTML = DOMPurify.sanitize(
    data.map((guess) => `<li>${guess}</li>`).join("")
  );
}

function handleSubmit(event) {
  event.preventDefault();

  const guess = input.value.toLowerCase().trim();
  if (!states.includes(guess) || prevGuesses.includes(guess)) return;

  const listItem = document.createElement("li");
  listItem.textContent = guess;

  guessList.append(listItem);
  count.textContent -= 1;

  input.value = "";
  input.focus();

  prevGuesses.push(guess);
  setData();
}

getData();
form.addEventListener("submit", handleSubmit);
