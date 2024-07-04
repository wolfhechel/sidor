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
    import { client } from "$lib/store";

    export let entry: Entry;
    export let entryIndex: number;

    let contentElement: HTMLElement;

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

    const setStatus = (status: string) => {
        $client
            .put<"">(`entries`, {
                entry_ids: [entry.id],
                status,
            })
            .then(() => {
                entry.status = status;
            });
    };
</script>

<article
    bind:this={contentElement}
    id={`${entry.feed.category.id}-${entryIndex}`}
>
    <header>
        <div>
            <address>
                <Favicon url={entry.url} size="20" /><b>{entry.feed.title}</b>
            </address>

            {#if entry.title}
                <a target="_blank" href={entry.url}>{entry.title}</a>
            {/if}
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
            <YouTubePlayer
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
        <label for="read-{entry.id}"
            >Read <input
                id="read-{entry.id}"
                type="checkbox"
                checked={entry.status == "read"}
                on:change={(e) => {
                    e.currentTarget.checked = entry.status == "read";
                    e.currentTarget.indeterminate = false;

                    setStatus(entry.status == "read" ? "unread" : "read");
                }}
            /></label
        >

        <label for="bookmark-{entry.id}"
            >Bookmark <input
                id="bookmark-{entry.id}"
                type="checkbox"
                checked={entry.starred}
                on:change={(e) => {
                    e.currentTarget.checked = entry.starred;
                    e.currentTarget.indeterminate = false;

                    $client.put(`entries/${entry.id}/bookmark`, {}).then(() => {
                        entry.starred = !entry.starred;
                    });
                }}
            /></label
        >
    </footer>
</article>

<style lang="scss">
    article {
        --horizontal-spacing: 15px;
        --vertical-spacing: 10px;
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

        header {
            position: sticky;
            top: 0;
            border-bottom: var(--article-border);
            background-color: var(--depth-1-color);
            z-index: 2;

            div {
                padding: var(--vertical-spacing) var(--horizontal-spacing);

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
            margin-top: var(--vertical-spacing);
            font-size: 16px;
            letter-spacing: 0.2px;
            font-weight: 400;
            line-height: 1.4;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: var(--vertical-spacing);

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
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 15px;
        }
    }
</style>
