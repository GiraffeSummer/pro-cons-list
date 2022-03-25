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
import component_plain from './components/lists/Plain.svelte'
export const listTypes = {
    procon: component_procon,
    todo: component_todo,
    plain: component_plain
}

//unused, maybe for later extra properties
const listProps = {
    procon: { isPro: true },
    todo: { done: false }
}

function getListProps(type) {
    if (type in listProps) {
        return { ...listProps[type] };
    } else return undefined;
}

//focus element
export function init(el) {
    el.focus();
}

export const createList = (name, items = [], editing = false) => {
    return { name, items, editing, listType: "procon" }
}

export const createListItem = (name, listType = 'procon', editing = false) => {
    const list = { name, isEditing: editing }
    list[listType] = getListProps(listType)
    return list
}

export const migrateList = (list, newType) => {
    const oldProps = getListProps(list.listType);
    const oldKeys = (oldProps !== undefined) ? Object.keys(oldProps) : [];
    list.items.map(item => {
        //oldKeys.forEach(k => { delete item[k]; });
        item[newType] = getListProps(newType);
        return item
    })
    list.listType = newType;
    return list
}

const loadedlist = JSON.parse(localStorage.getItem('lists')).map(x => upgradeMissing(x));

export let lists = writable(loadedlist || [
    createList(
        'My first list',
        [createListItem('item 1', 'procon'), createListItem('item 2', 'procon')],
        true
    ),
])

function upgradeMissing(list) {
    const templateList = createList('listname')
    const listKeys = Object.keys(templateList);
    listKeys.forEach(key => {
        if (!(key in list)) {
            list[key] = templateList[key]
        }
    })

    const templateItem = createListItem('itemname', list.listType)
    const itemKeys = Object.keys(templateItem);
    list.items.forEach(item => {
        itemKeys.forEach(key => {
            if (!(key in item)) {
                item[key] = templateItem[key]
            }
        })
    });
    return list
}

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

