<script>
  import { onDestroy } from "svelte";

  export let start = Date.now();

  export let elapsed = Date.now() - start;
  export let setElapsed = (ms) => (elapsed = ms);

  const padding = "0";

  $: minutes = Math.floor(elapsed / 1000 / 60)
    .toString()
    .padStart(2, padding);

  $: seconds = Math.floor((elapsed / 1000) % 60)
    .toString()
    .padStart(2, padding);

  const interval = setInterval(() => {
    setElapsed(Date.now() - start);
  }, 1000);

  export let stopped = false;

  if (stopped) {
    clearInterval(interval);
  }

  onDestroy(() => clearInterval(interval));
</script>

<span>{minutes}:{seconds}</span>

<style>
  span {
    font-weight: bold;
    font-variant-numeric: tabular-nums;
  }
</style>
