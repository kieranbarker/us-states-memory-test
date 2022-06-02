import states, { stateCount } from "./states";

const storageKey = "us-states-memory-test";

function getData() {
  return (
    JSON.parse(localStorage.getItem(storageKey)) || {
      count: { ...stateCount },
      prevGuesses: new Array(states.length).fill(""),
    }
  );
}

function setData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export { getData, setData };
