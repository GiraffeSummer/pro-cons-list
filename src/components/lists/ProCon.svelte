<script>
  import { symbols, save ,init} from '../../store.js';
  export let item;
</script>
<h3
  style="cursor:pointer;user-select: none;color: {item.isPro ? 'green' : 'red'}"
  on:click={() => {
    item.isPro = !item.isPro;
    save();
  }}
>
  {item.isPro ? symbols.pro : symbols.con}
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
  <h4 class="col-sm" on:click={() => (item.isEditing = true)}>
    {item.name}
  </h4>
{/if}
