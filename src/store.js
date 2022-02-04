import { writable } from 'svelte/store';

export let lists = writable([])

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

export const createList = (name, items = [], editing = false) => {
    return { name, items, editing }
}

export const createListItem = (name, editing = false) => {
    return { name, isPro: true, isEditing: editing }
}