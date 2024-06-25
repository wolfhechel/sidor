import { writable, type Writable, derived, type Readable } from "svelte/store";
import { Client } from "./api";

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