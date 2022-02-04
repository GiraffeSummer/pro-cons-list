<script>
  import Table from './Table.svelte';
  import { lists, createList, createListItem } from './store.js';
  import Analytics from './Analytics.svelte';

  const addList = () => {
    $lists = [...$lists, createList('new list', [])];
  };
</script>

<Analytics />
<div class="row">
  {#each $lists as list}
    <Table {list} />
  {/each}
  <button class="tertiary" on:click={addList}>Add</button>
</div>
