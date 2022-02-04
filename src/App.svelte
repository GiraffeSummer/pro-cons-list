<script>
  import Table from './Table.svelte';
  import { lists, createList, createListItem } from './store.js';

  $lists = [
    ...$lists,
    createList('My first list', [createListItem('item 1'), createListItem('item 2')],true)
  ];

  const addList = ()=>{
    $lists = [...$lists, createList('new list',[])]
  }  
</script>

<div class="row">
  {#each $lists as list}
    <Table {list} />
  {/each}
  <button class="tertiary"on:click="{addList}">Add</button>
</div>
