import { writable, type Writable, derived, type Readable } from "svelte/store";

export interface Feed {
    url: string;
}
export interface Channel {
    id: string;
    label: string;
    feeds: Feed[];
}

export const channels: Writable<Channel[]> = writable([]);

export const currentHash: Writable<string> = writable('');

export const currentChannel: Readable<Channel | undefined>  = derived(
    [currentHash, channels],
    ([$currentHash, $channels]) => {
        return $channels.find((value) => value.id == $currentHash) || $channels.at(0);
});