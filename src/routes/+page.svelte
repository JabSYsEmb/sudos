<script context="module" lang="ts">
  import { writable } from "svelte/store";
  const output = writable<string>();
</script>

<script lang="ts">
  async function commandFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const res = await fetch("/log", {
      method: "POST",
      body: data,
    });

    if (res.status === 500) {
      const stderr = await res.json();
      alert(stderr.message);
    }

    const stdout = await res.json();
    output.set(stdout.output);
  }
</script>

<form on:submit={commandFormSubmit}>
  <input type="text" name="command" />
  <button type="submit">execute</button>
</form>

{#if $output}
  <pre>{$output}</pre>
{/if}
