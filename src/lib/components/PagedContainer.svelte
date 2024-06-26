<script lang="ts" context="module">
    import type { ComponentType } from 'svelte';

    export interface Page {
        component: ComponentType;
        id: number;
        properties: Record<string, any>
    }
</script>

<script lang="ts">
    export let pages: Page[] = [];
    export let currentPage: number;

    let el: HTMLElement;

    const scroll = (ev: Event) => {
        let el: HTMLElement = ev.target as HTMLElement;

        let pageIndex = Math.round(el.scrollLeft / el.clientWidth);

        currentPage = pages.at(pageIndex)!.id;
    };

    const scrollToIfActive = (el: HTMLElement, pageId: number) => {
        if (pageId == currentPage) {
            el.scrollIntoView({
                behavior: "instant",
                inline: "nearest",
            });
        }
    }
</script>

<ul dir="ltr" on:scrollend={scroll} bind:this={el}>
    {#each pages as page}
    <li use:scrollToIfActive={page.id}>
        <svelte:component this={page.component} {...page.properties}/>
    </li>
    {/each}
</ul>

<style lang="scss">
    @use "$lib/breakpoints";

    ul {
        display: flex;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;

        overflow-x: scroll;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;

        @media screen and (min-width: breakpoints.$tablet) {
            max-width: var(--content-size);
        }

        li {
            list-style-type: none;
            flex: none;
            width: 100%;
            background-color: #f1f1f1;

            scroll-snap-align: start;
            scroll-snap-stop: always;
            overflow-y: scroll;
            overflow-x: clip;
        }
    }
</style>
