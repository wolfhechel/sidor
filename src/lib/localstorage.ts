import type { Writable } from "svelte/store";

export const connectLocalStorage = (store: Writable<any>, key: string) => {
    let serializedData = localStorage.getItem(key);

    if (serializedData !== null) {
        store.set(JSON.parse(serializedData));
    }

    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value))
    })
}