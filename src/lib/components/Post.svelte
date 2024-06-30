<script lang="ts" context="module">
</script>

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Entry } from "$lib/api";
    import { domain } from "$lib/utils";

    import Favicon from "./Favicon.svelte";
    import LinkPreview from "./LinkPreview.svelte";
    import ViewportVisible from "./ViewportVisible.svelte";
    import RenderHtml from "./RenderHtml.svelte";

    export let entry: Entry;

    const dispatch = createEventDispatcher();

    $: isRead = entry.status == "read";

    $: audio = entry.enclosures.find((enclosure) =>
        enclosure.mime_type.startsWith("audio"),
    );

    const toggleStatus = (e: Event & { target: HTMLInputElement }) => {
        e.target.checked = isRead;
        e.target.indeterminate = false;

        dispatch("setStatus", {
            entry_id: entry.id,
            status: isRead ? "unread" : "read",
        });
    };

    const findExternalLink = (content: string): string | null => {
        const parser: DOMParser = new DOMParser();

        let document = parser.parseFromString(content, "text/html");

        let rawLinks = Array.from(document.querySelectorAll("a")).filter(
            (element) => {
                return element.href == element.innerText;
            },
        );

        if (!rawLinks) {
            return null;
        }

        if (rawLinks.length > 1) {
            return null;
        }

        return rawLinks.at(0)?.href || null;
    };

    $: externalLink = findExternalLink(entry.content);
</script>

<article class:read={entry.status == "read"}>
    <header>
        <address>
            <Favicon url={entry.url} size="20" /><b>{entry.feed.title}</b>
        </address>

        {#if entry.title}
            <a target="_blank" href={entry.url}>{entry.title}</a>
        {/if}
    </header>

    <section>
        {#if audio}
            <audio controls>
                <source src={audio.url} type={audio.mime_type} />
                Your browser does not support the audio element.
            </audio>
        {:else if domain(entry.feed.feed_url) != domain(entry.url)}
            <ViewportVisible>
                <LinkPreview url={entry.url} />
            </ViewportVisible>
        {:else if externalLink}
            <ViewportVisible>
                <LinkPreview url={externalLink} />
            </ViewportVisible>
        {/if}

        <RenderHtml html={entry.content} />
    </section>

    <footer>
        <small>Read </small><input
            type="checkbox"
            bind:checked={isRead}
            on:change={toggleStatus}
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

        audio {
            width: 100%;
        }

        &.read {
            opacity: 0.4;
        }

        header {
            position: sticky;
            top: 0;
            padding: 10px 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            background-color: var(--background-color);
            z-index: 2;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

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

        section {
            font-size: 16px;
            letter-spacing: 0.2px;
            font-weight: 400;
            line-height: 1.4;
            position: relative;
            padding: 10px 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
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
