<script>
  import { save, init } from '../../store.js';
  export let item;
</script>

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
  <h4 class="col-sm" on:click={() => (item.isEditing = true)}>
    {item.name}
  </h4>
{/if}
