<script lang="ts" context="module">
    export type FeedItem = {
        id: string;
        name: string;
    };
</script>

<script lang="ts">
    import { onMount } from "svelte";

    import { writable } from "svelte/store";

    export let feeds: FeedItem[];

    export let defaultFeed: string = 'all';

    let activeFeed = writable(defaultFeed);

    const hashchange = () => activeFeed.set(window.location.hash.slice(1));

    onMount(() => {
        if (window.location.hash) {
            hashchange();
        }
    })
</script>

<svelte:window on:hashchange={hashchange} />

<ul>
    {#each feeds as feed}
        <li>
            <a href={`#${feed.id}`} aria-current={$activeFeed == feed.id ? 'page' : undefined}>{feed.name}</a>
        </li>
    {/each}
</ul>

<style lang="scss">
	@use "$lib/breakpoints";

    ul {
        margin: 0;
        padding: 0;
        padding-left: 5px;
        display: inline-flex;
        gap: 5px;
        flex: 1;

        li {
            list-style-type: none;
            flex: 1;

            a {
                color: black;
                text-decoration: none;
                display: block;
                padding: 12px;
                white-space: nowrap;
                border-top: 2px solid transparent;
                letter-spacing: 0.25px;
                font-weight: 700;
                text-align:center;

                &:hover {
                    background-color: var(--button-hover-color);
                }

                &[aria-current] {
                    border-color: var(--primary-color);
                }
            }
        }
    }
    
    @media screen and (min-width: breakpoints.$desktop) {
        ul {
            flex-direction: column;
            gap: 10px;
            padding: 10px;
            min-width: 300px;

            li {
                flex: none;

                a {
                    text-align: left;
                    border-left: 2px solid transparent;
                    border-bottom: 0;
                }
            }
        }
    }
</style>
