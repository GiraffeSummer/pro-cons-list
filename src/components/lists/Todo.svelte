<script>
  import { symbols, save, init } from '../../store.js';
  export let item;
</script>

<h3
  style="cursor:pointer;user-select: none;"
  on:click={() => {
    item.todo.done = !item.todo.done;
    save();
  }}
>
  ☑
</h3>
{#if item.isEditing}
  <input
    class="col-sm"
    type="text"
    bind:value={item.name}
    use:init
    on:blur={() => {
      item.isEditing = false;
      save();
    }}
  />
{:else}
  <h4
    class="col-sm {item.todo.done ? 'crossed' : ''}"
    on:click={() => (item.isEditing = true)}
  >
    {item.name}
  </h4>
{/if}

<style>
  .crossed {
    text-decoration: line-through;
    text-decoration-thickness: 0.1em;
  }
</style>
