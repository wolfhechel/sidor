<script lang="ts">
    import type { Item } from "$lib/granary";
    import { svelteTime } from "svelte-time";

    export let post: Item;

    const getAvatar = (post: Item): string => {
        let avatar: string;

        if (post.author.avatar) {
            avatar = post.author.avatar;
        } else {
            let domain = new URL(post.author.url).hostname;
            let size = 128;
            avatar = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
        }

        return avatar;
    };
</script>

<article>
    <header>
        <address>
            <img src={getAvatar(post)} /><b>{post.author.name}</b><time
                use:svelteTime={{
                    relative: true,
                    timestamp: post.date_published,
                }}
            />
        </address>

        {#if post.title}
            <a target="_blank" href={post.url}>{post.title}</a>
        {/if}
    </header>

    <section>
        {@html post.content_html}
    </section>
</article>

<style lang="scss">
    article {
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        border-bottom: 1px solid var(--border-color);

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
        }
    }
</style>
