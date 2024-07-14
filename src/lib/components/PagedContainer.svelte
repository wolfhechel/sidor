<script lang="ts" context="module">
    import type { ComponentType } from "svelte";

    export interface Page {
        component: ComponentType;
        id: number;
        properties: Record<string, any>;
    }
</script>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let pages: Page[] = [];
    export let currentPage: number;

    let el: HTMLElement;

    const dispatch = createEventDispatcher();

    const scroll = (ev: Event) => {
        let el: HTMLElement = ev.target as HTMLElement;

        let pageIndex = Math.round(el.scrollLeft / el.clientWidth);

        let newCurrentPage = pages.at(pageIndex)!.id;

        if (currentPage != newCurrentPage) {
            currentPage = newCurrentPage;
            dispatch("pageChanged", currentPage);
        }
    };

    const scrollToIfActive = (el: HTMLElement, pageId: number) => {
        if (pageId == currentPage) {
            el.scrollIntoView({
                behavior: "instant",
                inline: "nearest",
            });
        }
    };
</script>

<ul
    dir="ltr"
    on:scrollend={scroll}
    bind:this={el}
    role="tablist"
    id="tablist"
    class="full flex overflow-x-scroll overflow-y-hidden snap-mandatory snap-x scroll-smooth no-scrollbar"
>
    {#each pages as page}
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <li
            use:scrollToIfActive={page.id}
            role="tabpanel"
            tabindex="-1"
            class="full flex flex-none overflow-x-clip overflow-y-hidden snap-start snap-always"
        >
            <svelte:component this={page.component} {...page.properties} />
        </li>
    {/each}
</ul>
