import { derived, type Readable } from "svelte/store";
import { persisted } from "svelte-persisted-store";
import { Client, type User } from "./api";

export interface Profile {
    token?: string
    host?: string
    user?: User
};

export const profile = persisted<Profile>("profile", {})

export const client: Readable<Client> = derived([profile], ([$profile]) => {
    return new Client($profile.host, $profile.token);
});