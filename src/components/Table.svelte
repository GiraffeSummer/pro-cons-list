<script>
  import { createListItem, save, lists, symbols } from '../store.js';
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
    list.items = [...list.items, createListItem('new item', true)];
    save();
  };
  const remItem = (ind) => {
    list.items = list.items.filter((value, index, arr) => ind != index);
    save();
  };
  function init(el) {
    el.focus();
  }
  function removeList() {
    $lists = $lists.filter((value, index, arr) => {
      if (value != list) return value;
    });
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
  </div>

  <ul class="">
    {#each list.items as d, ind}
      <li class="row">
        <h3
          style="cursor:pointer;user-select: none;color: {d.isPro
            ? 'green'
            : 'red'}"
          on:click={() => {
            d.isPro = !d.isPro;
            save();
          }}
        >
          {d.isPro ? symbols.pro : symbols.con}
        </h3>
        {#if d.isEditing}
          <input
            class="col-sm"
            type="text"
            bind:value={d.name}
            use:init
            on:blur={() => {
              d.isEditing = false;
              save();
            }}
          />
        {:else}
          <h4 class="col-sm" on:click={() => (d.isEditing = true)}>
            {d.name}
          </h4>
        {/if}

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
    <button on:click={removeList} title="delete {list.name}" class="secondary col-sm-offset-9" >
      {symbols.delete}
    </button>
  </div>
</div>
