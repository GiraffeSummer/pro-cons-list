import { writable } from 'svelte/store';

export const symbols = {
    up: '▲',
    down: '▼',
    plus: '+',
    delete: '🗑',
    edit: '✎',
    pro: '✔',
    con: 'x',
};

import component_procon from './components/lists/ProCon.svelte'
import component_todo from './components/lists/Todo.svelte'
export const listTypes = {
    procon: component_procon,
    todo: component_todo
}

//unused, maybe for later extra properties
const listProps = {
    procon: { isPro: true },
    todo: { done: false }
}

//focus element
export function init(el) {
    el.focus();
}

export const createList = (name, items = [], editing = false) => {
    return { name, items, editing, listType: "procon" }
}

export const createListItem = (name, editing = false) => {
    return { name, isPro: true, isEditing: editing }
}

const loadedlist = JSON.parse(localStorage.getItem('lists'));
export let lists = writable(loadedlist || [
    createList(
        'My first list',
        [createListItem('item 1'), createListItem('item 2')],
        true
    ),
])

export const save = () => {
    //force save
    lists.update(l => l)
}

lists.subscribe((value) => {
    localStorage.setItem('lists', JSON.stringify(value));
});

export function makeid(length = 5) {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

