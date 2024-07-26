<script context="module" lang="ts">
  import { writable } from "svelte/store";
  const output = writable<string>();
  const error = writable<string>();
</script>

<script lang="ts">
  async function commandFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    error.set("");
    output.set("");

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const res = await fetch("/log", {
      method: "POST",
      body: data,
    });

    if (res.status === 500) {
      const stderr = await res.json();
      error.set(stderr.message);
    }

    const stdout = await res.json();
    output.set(stdout.output);
  }
</script>

<form on:submit={commandFormSubmit}>
  <input type="text" name="command" />
  <button type="submit">execute</button>
</form>

{#if $error}
  <div class="error">
    <pre>{$error}</pre>
  </div>
{/if}

{#if $output}
  <div class="feedback">
    <pre>{$output}</pre>
  </div>
{/if}

<style>
  .error {
    background-color: oklch(80.89% 0.2032 17.63 / 0.5);
    border: 2px solid red;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
  }

  .feedback {
    background-color: oklch(80.89% 0.2032 150.63 / 0.7);
    border: 2px solid red;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
  }
</style>
