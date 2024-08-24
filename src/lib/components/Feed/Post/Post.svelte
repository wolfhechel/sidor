<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { findEnclosure } from "$lib/utils/api";
    import domain from '$lib/utils/domain';
    import { findExternalLinks, removeDomElements } from "$lib/utils/dom";

    import Time from "svelte-time";

    import type { Entry } from "$lib/api";

    import Favicon from "./Favicon.svelte";
    import LinkPreview from "./LinkPreview";
    import ViewportVisible from "../../ViewportVisible.svelte";
    import RenderHtml from "./RenderHtml.svelte";
    import ScrollProgress from "./ScrollProgress.svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import Disclosure from "./Disclosure.svelte";
    import Bookmark from "./Bookmark.svelte";
    import * as YouTube from "./YouTube";
    import Icon from "@iconify/svelte";

    export let entry: Entry;
    export let entryIndex: number;

    let contentElement: HTMLElement;

    const dispatch = createEventDispatcher();

    $: audio = findEnclosure(entry.enclosures, "audio/");

    $: youTubeVideo = findEnclosure(
        entry.enclosures,
        "application/x-shockwave-flash",
    );

    $: hasEnclosure = youTubeVideo || audio;

    $: html = youTubeVideo
        ? removeDomElements(entry.content, 'iframe[src*="www.youtube"]')
        : entry.content;

    $: previewLink =
        domain(entry.feed.feed_url) != domain(entry.url)
            ? entry.url
            : findExternalLinks(entry.content).at(0);

    const constructEntryId = (feedId: number, entryIndex: number): string => {
        return `entry-${feedId}-${entryIndex}`;
    };

    const setStatus = (status: string) => {
        if (status == entry.status) return;

        dispatch("setStatus", {
            id: entry.id,
            status: status,
        });
    };

    const toggleBookmark = () => {
        dispatch("toggleBookmark", {
            id: entry.id,
        });
    };
</script>

<article
    bind:this={contentElement}
    id={constructEntryId(entry.feed_id, entryIndex)}
    class="flex flex-col bg-white contain-layout contain-paint border-b"
>
    <header class="sticky top-0 border-b bg-white z-10">
        <div class="p-4">
            <div class="flex pb-2 items-center gap-2">
                <Favicon url={entry.url} size="20" /><span
                    >{entry.feed.title}</span
                >
                <span class="text-light-foreground-secondary"
                    ><Time relative timestamp={entry.published_at} /></span
                >
                {#if entry.status == "unread"}
                    <span class="block h-2 aspect-square rounded bg-accent"
                    ></span>
                {/if}
            </div>

            <span class="grid grid-cols-12 gap-x-4">
                <a
                    class="flex items-center font-bold col-span-11 text-md"
                    target="_blank"
                    href={entry.url}>{entry.title || entry.url}</a
                >

                <button
                    class="flex justify-end items-center"
                    on:click={() => {
                        document
                            .querySelector(
                                `#${constructEntryId(entry.feed_id, entryIndex + 1)}`,
                            )
                            ?.scrollIntoView();
                    }}
                    ><Icon
                        icon="mdi:chevron-down"
                        width="1.5rem"
                        height="1.5rem"
                    /></button
                >
            </span>
        </div>

        {#if !hasEnclosure}
            <ScrollProgress
                {contentElement}
                on:completed|once={() => {
                    setStatus("read");
                }}
            />
        {/if}
    </header>

    {#if audio}
        <section class="relative flex flex-col px-4 max-w-[65ch]">
            <AudioPlayer
                src={audio.url}
                metadata={new MediaMetadata({
                    artist: entry.feed.title,
                    title: entry.title,
                })}
            />
        </section>
    {:else if youTubeVideo}
        <section class="relative flex flex-col">
            <YouTube.Player
                url={youTubeVideo.url}
                on:ended={() => {
                    setStatus("read");
                }}
            />
        </section>
    {:else if previewLink}
        <section class="relative flex flex-col px-4">
            <ViewportVisible>
                <LinkPreview url={previewLink} />
            </ViewportVisible>
        </section>
    {/if}

    <section class="relative flex flex-col px-4">
        {#if hasEnclosure}
            <Disclosure summary="Description">
                <RenderHtml {html} />
            </Disclosure>
        {:else}
            <RenderHtml {html} />
        {/if}
    </section>

    <footer
        class="mt-2 px-4 py-2 flex gap-x-4 items-center justify-end border-t"
    >
        <Bookmark bind:checked={entry.starred} on:change={toggleBookmark} />
    </footer>
</article>
