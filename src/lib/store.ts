import { writable, type Writable, derived, type Readable } from "svelte/store";
import { type Category, Client } from "./api";

export interface Profile {
    token: string | undefined
    host: string | undefined
};

export const profile: Writable<Profile> = writable({
    host: undefined,
    token: undefined
});

export const client: Readable<Client> = derived([profile], ([$profile]) => {
    return new Client($profile.host, $profile.token);
});

export const categories: Writable<Category[]> = writable([]);

export const currentHash: Writable<string> = writable('');

export const currentCategory: Readable<Category | undefined>  = derived(
    [currentHash, categories],
    ([$currentHash, $categories]) => {
        return $categories.find((value) => value.id.toString() == $currentHash) || $categories.at(0);
});