<script>
  import { symbols, save ,init} from '../../store.js';
  export let item;
</script>
<h3
  style="cursor:pointer;user-select: none;color: {item.procon.isPro ? 'green' : 'red'}"
  on:click={() => {
    item.procon.isPro = !item.procon.isPro;
    save();
  }}
>
  {item.procon.isPro ? symbols.pro : symbols.con}
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
