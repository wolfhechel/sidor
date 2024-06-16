<script lang="ts">
    import Feed from "$lib/components/Feed.svelte";
    import { categories, currentCategory } from "$lib/store";

    const scroll = (ev: Event) => {
        let el: HTMLElement = ev.target as HTMLElement;

        let pageIndex = Math.round(el.scrollLeft / el.clientWidth);
        let targetChannel = $categories.at(pageIndex);

        window.location.hash = `#${targetChannel?.id}`;
    };

    let feedContainer: HTMLElement;

    currentCategory.subscribe((value) => {
        if (!value || !feedContainer) {
            return;
        }

        let channelIndex = $categories.indexOf(value);
        let channelEl: HTMLElement = feedContainer.childNodes[
            channelIndex
        ] as HTMLElement;

        if (channelEl) {
            channelEl.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
            });
        }
    });
</script>

<ul dir="ltr" on:scrollend={scroll} bind:this={feedContainer}>
    {#each $categories as category}
        <li>
            <Feed {category} />
        </li>
    {/each}
</ul>

<style lang="scss">
    @use "$lib/breakpoints";

    ul {
        margin: 0;
        padding: 0;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        display: flex;
        height: 100%;
        width: 100%;
        overflow-y: hidden;
        scroll-behavior: smooth;

        @media screen and (min-width: breakpoints.$tablet) {
            max-width: var(--content-size);
        }

        li {
            list-style-type: none;
            flex: none;
            width: 100%;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            overflow-y: scroll;
            overflow-x: clip;
            background-color: #f1f1f1;
        }
    }
</style>
