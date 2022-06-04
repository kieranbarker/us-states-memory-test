import states, { stateCount } from "./states";

const storageKey = "us-states-memory-test";

function getData() {
  return JSON.parse(localStorage.getItem(storageKey)) || resetData();
}

function setData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function resetData() {
  return {
    count: { ...stateCount },
    elapsed: 0,
    prevGuesses: new Array(states.length).fill(""),
  };
}

export { getData, setData, resetData };
