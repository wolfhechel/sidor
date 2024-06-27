<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Entry } from "$lib/api";

    export let entry: Entry;

    const getAvatar = (post: Entry): string | null => {
        let avatar: string | null;

        try {
            let domain = new URL(post.url).hostname;
            let size = 128;
            avatar = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
        } catch (err) {
            avatar = null;
        }

        return avatar;
    };

    const dispatch = createEventDispatcher();

    $: isRead = entry.status == "read";

    const toggleStatus = (e) => {
        e.target.checked = isRead;
        e.target.indeterminate = false;

        dispatch("setStatus", {
            entry_id: entry.id,
            status: isRead ? "unread" : "read",
        });
    };
</script>

<article class:read={entry.status == "read"}>
    <header>
        <address>
            <img alt="Avatar of post" src={getAvatar(entry)} /><b
                >{entry.feed.title}</b
            >
        </address>

        {#if entry.title}
            <a target="_blank" href={entry.url}>{entry.title}</a>
        {/if}
    </header>

    <section>
        {@html entry.content}
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

                img {
                    height: 20px;
                    width: 20px;
                    padding-right: 5px;
                }
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

            :global(table) {
                border-spacing: 0;
            }

            :global(h1) {
                line-height: 1.25;
            }

            :global(h3) {
                line-height: 1.3;
            }

            :global(iframe) {
                width: 100%;
                height: auto;
                aspect-ratio: 16 / 9;
            }

            :global(img) {
                max-width: 100%;
                border-radius: 10px;
            }

            :global(video) {
                max-width: 100%;
            }

            :global(figure) {
                margin-block: 20px;
                margin-inline: 0;
            }

            :global(figcaption) {
                text-align: center;
                font-size: 0.8rem;
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
