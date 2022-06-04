<script>
  import { afterUpdate } from "svelte";
  import { getData, setData, resetData } from "../storage";
  import { shuffle, toTitleCase } from "../utils";
  import states from "../states";
  import Flag from "./Flag.svelte";
  import Form from "./Form.svelte";
  import Stopwatch from "./Stopwatch.svelte";

  let prevHint;

  let { count, elapsed, prevGuesses } = getData();
  let alert = { type: "", message: "" };

  $: start = Date.now() - elapsed;

  $: numGuessed = prevGuesses.filter((guess) => guess !== "").length;
  $: numRemaining = states.length - numGuessed;

  $: hints = Object.keys(count).map((letter) => {
    const letterCount = count[letter];
    const letterUpper = letter.toUpperCase();

    if (letterCount === 1) {
      return `There is 1 more state beginning with ${letterUpper}.`;
    }

    return `There are ${letterCount} more states beginning with ${letterUpper}.`;
  });

  afterUpdate(() => setData({ count, elapsed, prevGuesses }));

  function reset() {
    ({ count, elapsed, prevGuesses } = resetData());
  }

  function showHint() {
    let hint = shuffle(hints)[0];

    while (hint === prevHint) {
      if (hints.length === 1) {
        break;
      }

      hint = shuffle(hints)[0];
    }

    if (hint !== prevHint) {
      prevHint = hint;
    }

    alert.type = "info";
    alert.message = hint;
  }

  function handleSubmit(event) {
    const input = event.target.elements.guess;
    if (!input) return;

    const guess = input.value.toLowerCase().trim();
    if (!guess) return;

    if (prevGuesses.includes(guess)) {
      alert.type = "warning";
      alert.message = `You already guessed ${toTitleCase(guess)}.`;
      return;
    }

    const index = states.indexOf(guess);

    if (index < 0) {
      alert.type = "danger";
      alert.message = `${toTitleCase(guess)} isn't a US state.`;
      return;
    }

    const letter = guess.charAt(0);

    input.value = "";
    prevGuesses[index] = guess;

    if (count[letter] > 1) {
      count[letter]--;
    } else {
      delete count[letter];
      count = count;
    }

    if (alert.type || alert.message) {
      alert.type = "";
      alert.message = "";
    }
  }
</script>

<header>
  <h1><Flag /> Remember the States</h1>
  <p>Can you remember all {states.length} states?</p>
</header>

<main>
  {#if numRemaining}
    <Stopwatch {start} {elapsed} setElapsed={(ms) => (elapsed = ms)} />
    <Form
      {numGuessed}
      {numRemaining}
      {alert}
      on:submit={handleSubmit}
      on:click={showHint}
    />
  {:else}
    <p>
      Good work! You remembered them all in <Stopwatch
        {start}
        {elapsed}
        stopped={true}
      />.
    </p>
  {/if}

  <ol>
    {#each prevGuesses as prevGuess, i (i)}
      <li>{prevGuess}</li>
    {/each}
  </ol>

  {#if numGuessed === states.length}
    <p>
      <button type="button" on:click={reset}>Start again</button>
    </p>
  {/if}
</main>

<style>
  ol {
    text-transform: capitalize;
  }

  li {
    padding: 0 0.25rem;
  }

  li:nth-child(even) {
    background: #efefef;
  }
</style>
