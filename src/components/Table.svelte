<script>
  import {
    createListItem,
    save,
    lists,
    symbols,
    listTypes,
    init,
    migrateList,
  } from '../store.js';
  export let list;

  const ReSort = (ind, direction = 1) => {
    //direction: 1 is up, -1 is down
    let newInd = ind + direction;
    list.items = arraymove(list.items, ind, newInd);
    save();
  };
  function arraymove(arr, fromIndex, toIndex) {
    let element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }
  const addItem = () => {
    list.items = [
      ...list.items,
      createListItem('new item', list.listType, true),
    ];
    save();
  };
  const remItem = (ind) => {
    list.items = list.items.filter((value, index, arr) => ind != index);
    save();
  };

  function removeList() {
    $lists = $lists.filter((value, index, arr) => {
      if (value != list) return value;
    });
  }

  let newType = list.listType;

  function migrate() {
    list = migrateList(list, newType);
    save();
  }
</script>

<div class="card large col-md-6">
  <div class="section row">
    {#if list.editing}
      <input
        class="col-sm"
        type="text"
        bind:value={list.name}
        use:init
        on:blur={() => {
          list.editing = false;
          save();
        }}
      />
    {:else}
      <h3 class="col-sm" on:click={() => (list.editing = true)}>
        {list.name}
      </h3>
    {/if}
    <select bind:value={newType} on:change={migrate}>
      {#each Object.keys(listTypes) as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
  </div>

  <ul class="">
    {#each list.items as d, ind}
      <li class="row">
        <!--list element-->
        <svelte:component this={listTypes[list.listType]} item={d} />

        <div class="button-group">
          <button
            disabled={ind == 0}
            on:click={() => {
              ReSort(ind, -1);
            }}>{symbols.up}</button
          >
          <button
            disabled={ind == list.items.length - 1}
            on:click={() => {
              ReSort(ind, 1);
            }}>{symbols.down}</button
          >

          <button
            title="delete item"
            class="secondary"
            on:click={() => {
              remItem(ind);
            }}
          >
            {symbols.delete}
          </button>
        </div>
      </li>
    {/each}
  </ul>
  <div class="section dark">
    <button on:click={addItem} title="add row" class="tertiary">
      {symbols.plus}
    </button>
    <button
      on:click={removeList}
      title="delete {list.name}"
      class="secondary col-sm-offset-9"
    >
      {symbols.delete}
    </button>
  </div>
</div>
