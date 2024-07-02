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
    import LinkPreview from "./LinkPreview.svelte";
    import ViewportVisible from "./ViewportVisible.svelte";
    import RenderHtml from "./RenderHtml.svelte";
    import ScrollProgress from "./ScrollProgress.svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import Disclosure from "./Disclosure.svelte";
    import YouTubePlayer from "./YouTubePlayer.svelte";

    export let entry: Entry;
    export let entryIndex: number;
    export let scrollParent: HTMLElement;

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

    let contentElement: HTMLElement;
    let scrollMarginBottom: number;
    let scrollMarginTop: number;

    $: scrollMargin = scrollMarginBottom + scrollMarginTop;

    let markedAsRead = entry.status != "unread";
</script>

<article
    bind:this={contentElement}
    class:read={entry.status == "read"}
    id={`${entry.feed.category.id}-${entryIndex}`}
>
    <header bind:clientHeight={scrollMarginTop}>
        <div>
            <address>
                <Favicon url={entry.url} size="20" /><b>{entry.feed.title}</b>
            </address>

            {#if entry.title}
                <a target="_blank" href={entry.url}>{entry.title}</a>
            {/if}
        </div>

        {#if !audio && !youTubeVideo}
            <ScrollProgress
                {contentElement}
                {scrollParent}
                bind:marginBottom={scrollMargin}
                on:completed={() => {
                    if (markedAsRead) {
                        return;
                    }

                    markedAsRead = true;

                    dispatch("setStatus", {
                        entry_id: entry.id,
                        status: "read",
                    });
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
            <YouTubePlayer
                url={youTubeVideo.url}
                on:ended={() => {
                    dispatch("setStatus", {
                        entry_id: entry.id,
                        status: "read",
                    });
                }}
            />
        </section>
    {:else if previewLink}
        <section class="link-preview">
            <ViewportVisible>
                <LinkPreview url={entry.url} />
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

    <footer bind:clientHeight={scrollMarginBottom}>
        <small>Read </small><input
            type="checkbox"
            checked={entry.status == "read"}
            on:change={(e) => {
                e.currentTarget.indeterminate = false;

                dispatch("setStatus", {
                    entry_id: entry.id,
                    status: entry.status == "read" ? "unread" : "read",
                });
            }}
        />
    </footer>
</article>

<style lang="scss">
    article {
        display: flex;
        flex-direction: column;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
        background-color: var(--background-color);
        color: var(--text-color);
        transition: opacity 0.25s ease-in-out;
        -moz-transition: opacity 0.25s ease-in-out;
        -webkit-transition: opacity 0.25s ease-in-out;
        gap: 10px;

        &.read {
            opacity: 0.4;
        }

        header {
            position: sticky;
            top: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            background-color: var(--background-color);
            z-index: 2;

            div {
                padding: 10px 15px;

                address {
                    display: flex;
                    font-style: normal;
                    font-size: 0.8rem;
                    padding-bottom: 10px;
                    align-items: center;
                    gap: 5px;
                }

                a {
                    text-decoration: none;
                    color: var(--text-color);
                    font-weight: bold;
                }
            }
        }

        section {
            font-size: 16px;
            letter-spacing: 0.2px;
            font-weight: 400;
            line-height: 1.4;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 10px;

            padding: 0 15px;

            &.video {
                padding: 0;
            }
        }

        footer {
            padding: 10px 15px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 5px;
        }
    }
</style>
