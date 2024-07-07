<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import {
        domain,
        findEnclosure,
        findExternalLinks,
        removeDomElements,
    } from "$lib/utils";

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
    import StatusMarker from "./StatusMarker.svelte";

    export let entry: Entry;
    export let entryIndex: number;
    export let feedId: string;

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

    const constructEntryId = (feedId: string, entryIndex: number): string => {
        return `entry-${feedId}-${entryIndex}`;
    };

    const setStatus = (status: string) => {
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

<article bind:this={contentElement} id={constructEntryId(feedId, entryIndex)}>
    <header>
        <div>
            <address>
                <Favicon url={entry.url} size="20" /><b>{entry.feed.title}</b>
            </address>

            <span>
                <a target="_blank" href={entry.url}
                    >{entry.title || entry.url}</a
                >

                <button
                    on:click={() => {
                        document
                            .querySelector(
                                `#${constructEntryId(feedId, entryIndex + 1)}`,
                            )
                            ?.scrollIntoView();
                    }}
                    ><Icon
                        icon="mdi:chevron-down"
                        width="2rem"
                        height="2rem"
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
        <section class="audio">
            <AudioPlayer
                src={audio.url}
                metadata={new MediaMetadata({
                    artist: entry.feed.title,
                    title: entry.title,
                })}
            />
        </section>
    {:else if youTubeVideo}
        <section class="video">
            <YouTube.Player
                url={youTubeVideo.url}
                on:ended={() => {
                    setStatus("read");
                }}
            />
        </section>
    {:else if previewLink}
        <section class="link-preview">
            <ViewportVisible>
                <LinkPreview url={previewLink} />
            </ViewportVisible>
        </section>
    {/if}

    <section class="text">
        <div class="padd">
            {#if hasEnclosure}
                <Disclosure summary="Description">
                    <RenderHtml {html} />
                </Disclosure>
            {:else}
                <RenderHtml {html} />
            {/if}
        </div>
    </section>

    <footer>
        <span />
        <Bookmark bind:checked={entry.starred} on:change={toggleBookmark} />
        <StatusMarker bind:status={entry.status} />
    </footer>
</article>

<style lang="scss">
    article {
        --horizontal-spacing: 16px;
        --vertical-spacing: 8px;
        --article-border: 1px solid #0000000f;

        display: flex;
        flex-direction: column;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
        background-color: var(--depth-1-color);
        color: var(--text-color);
        transition: opacity 0.25s ease-in-out;
        -moz-transition: opacity 0.25s ease-in-out;
        -webkit-transition: opacity 0.25s ease-in-out;
        contain: layout paint;
    }

    header {
        position: sticky;
        top: 0;
        border-bottom: var(--article-border);
        background-color: var(--depth-1-color);
        z-index: 2;

        & > div {
            padding: 16px 16px 14px 16px;

            address {
                display: flex;
                font-style: normal;
                padding-bottom: 8px;
                align-items: center;
                gap: 8px;
            }

            span {
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                grid-column-gap: 16px;

                a {
                    display: block;
                    text-decoration: none;
                    color: var(--text-color);
                    font-weight: bold;
                    grid-column: 1 / span 11;
                    font-size: 1.1875rem;
                    line-height: 1.375rem;
                }

                button {
                    padding: 0;
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }

    section {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0 var(--horizontal-spacing);

        &.video {
            padding: 0;
            margin: 0;
        }
    }

    footer {
        margin-top: var(--vertical-spacing);
        padding: var(--vertical-spacing) var(--horizontal-spacing);
        border-top: var(--article-border);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 16px;
        align-items: center;

        span {
            grid-column: 1 / 11;
        }
    }
</style>
