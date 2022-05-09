<script>
  import { onMount, afterUpdate } from "svelte";
  import { getData, setData } from "../storage";

  import states from "../states";

  import Game from "./Game.svelte";
  import PlayAgain from "./PlayAgain.svelte";

  let prevGuesses = [];

  $: count = states.length - prevGuesses.length;

  onMount(() => (prevGuesses = getData()));
  afterUpdate(() => setData(prevGuesses));

  function reset() {
    prevGuesses = [];
  }

  function handleSubmit(event) {
    const input = event.target.elements["guess"];

    const guess = input.value.toLowerCase().trim();
    if (!states.includes(guess) || prevGuesses.includes(guess)) return;

    input.value = "";
    prevGuesses = [...prevGuesses, guess];
  }
</script>

<header>
  <h1>🇺🇸 US states memory test</h1>
  <p>Can you remember all {states.length} states?</p>
</header>

<main>
  {#if count}
    <Game {count} on:submit={handleSubmit} />
  {:else}
    <PlayAgain on:click={reset} />
  {/if}

  <ol>
    {#each prevGuesses as prevGuess (prevGuess)}
      <li>{prevGuess}</li>
    {/each}
  </ol>
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
