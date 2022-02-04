<script>
  const symb = {
    up: '▲',
    down: '▼',
    plus: '+',
    delete: '🗑',
    edit: '✎',
    pro: '✔',
    con: '⨯',
  };
  import { createListItem, save,lists } from './store.js';
  let editing = true;
  export let list;

  const ReSort = (o, ind, up = true) => {
    let newInd = up ? ind + 1 : ind - 1;
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
  const remItem = (ind, o) => {
    list.items = list.items.filter((value, index, arr) => ind != index);
    save();
  };
  function init(el) {
    el.focus();
  }
function removeList(){
  $lists = $lists.filter((value, index, arr)=>{ 
    if (value != list) return value;
  });
}
</script>

<div class="card large col-sm-6">
  <div class="section row">
    <div />

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
          style="user-select: none;color: {d.isPro ? 'green' : 'red'}"
          on:click={() => {
            d.isPro = !d.isPro;
            save();
          }}
        >
          {d.isPro ? symb.pro : symb.con}
        </h3>
        {#if d.isEditing}
          <input
            type="text"
            bind:value={d.name}
            use:init
            on:blur={() => {
              d.isEditing = false;
              save();
            }}
          />
        {:else}
          <h4 class="collapse col-sm-6" on:click={() => (d.isEditing = true)}>
            {d.name}
          </h4>
        {/if}

        <div class="button-group">
          <button
            disabled={ind == 0}
            on:click={() => {
              ReSort(d, ind, false);
            }}>{symb.up}</button
          >
          <button
            disabled={ind == list.items.length - 1}
            on:click={() => {
              ReSort(d, ind, true);
            }}>{symb.down}</button
          >

          <button
            title="delete item"
            class="secondary"
            on:click={() => {
              remItem(ind);
            }}
          >
            {symb.delete}
          </button>
        </div>
      </li>
    {/each}
  </ul>
  <div class="section dark">
    <button on:click={addItem} class="tertiary">
      {symb.plus}
    </button>
    <button on:click={removeList} class="secondary">
      {symb.delete}
    </button>
  </div>
</div>
