<script>
  export let numGuessed, numRemaining;
  export let alert = { type: "", message: "" };
</script>

<ul>
  <li>Guessed: <b>{numGuessed}</b></li>
  <li>Remaining: <b>{numRemaining}</b></li>
</ul>

{#if alert.type && alert.message}
  <p class="alert {`alert-${alert.type}`}">{alert.message}</p>
{/if}

<form on:submit|preventDefault>
  <p>
    <label for="guess">Your guess</label>
    <input type="text" name="guess" id="guess" required />
  </p>
  <p>
    <button type="submit">Guess</button>
    <button type="button" on:click>Hint</button>
  </p>
</form>

<style>
  label,
  input {
    display: block;
  }

  /*
    Alert styles by Bootstrap.
    https://getbootstrap.com/docs/5.2/components/alerts/
  */
  .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
  .alert.alert-info {
    color: #055160;
    background-color: #cff4fc;
    border-color: #b6effb;
  }
  .alert.alert-warning {
    color: #664d03;
    background-color: #fff3cd;
    border-color: #ffecb5;
  }
  .alert.alert-danger {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
  }
</style>
