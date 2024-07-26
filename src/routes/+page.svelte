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
    })
      .then((res) => res.json())
      .catch((_) => ({ error: "something went wrong" }));

    if (res.type === "success") {
      output.set(res.data.output);
    }
  }
</script>

<form on:submit={commandFormSubmit}>
  <input type="text" name="command" />
  <button type="submit">execute</button>
</form>

{#if $output}
  <pre>{$output}</pre>
{/if}
