<script lang="ts">
    import type { Entry } from "$lib/api";
    import { svelteTime } from "svelte-time";

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

    const sanitize = (content: string) => {
        return content;
    };

    let contentHeight: number;
</script>

<article>
    <header>
        <address>
            <img alt="Avatar of post" src={getAvatar(entry)} /><b
                >{entry.feed.title}
                {#if entry.author}({entry.author}){/if}</b
            ><time
                use:svelteTime={{
                    relative: true,
                    timestamp: entry.published_at,
                }}
            />
        </address>

        {#if entry.title}
            <a target="_blank" href={entry.url}>{entry.title}</a>
        {/if}
    </header>

    <section bind:clientHeight={contentHeight}>
        {@html sanitize(entry.content)}
    </section>
</article>

<style lang="scss">
    article {
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        margin-bottom: 10px;
        box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.3);
        background-color: var(--background-color);

        header {
            margin-bottom: 10px;

            address {
                display: flex;
                font-style: normal;
                font-size: 0.8rem;
                padding-bottom: 5px;
                align-items: center;

                img {
                    height: 20px;
                    width: 20px;
                    padding-right: 5px;
                }

                time {
                    padding-left: 20px;
                    text-decoration: none;
                    color: var(--text-secondary);
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
            color: rgb(0, 0, 0);
            line-height: 20.8px;

            :global(iframe) {
                width: 100%;
                height: auto;
                aspect-ratio: 16 / 9;
            }

            :global(img) {
                max-width: 100%;
            }
        }
    }
</style>
