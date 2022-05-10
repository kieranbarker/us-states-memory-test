<script>
  export let count;
</script>

<p><b>{count}</b> states to go...</p>

<form on:submit|preventDefault>
  <p>
    <label for="guess">Your guess</label>
    <input type="text" name="guess" id="guess" />
  </p>
  <p>
    <button type="submit">Guess</button>
  </p>
</form>

<style>
  label,
  input {
    display: block;
  }
</style>
