const storageKey = "us-states-memory-test";

function getData() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function setData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export { getData, setData };
