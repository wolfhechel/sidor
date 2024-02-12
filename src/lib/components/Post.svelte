<script lang="ts" context="module">
    export type Post = {
        id: number;
        author: string;
        avatar: string | null;
        source: string;
        content: string;
    };
</script>

<script lang="ts">
    import Avatar from "./Avatar.svelte";
    export let post: Post;
</script>

<article>
    <Avatar avatar={post.avatar} alt={post.author} />
    <div>
        <header>
            <address>
                <b>{post.author}</b><span>{post.source}</span>
            </address>
        </header>
        <span>
            {post.content}
        </span>
    </div>
</article>

<style lang="scss">
    article {
        display: flex;
        gap: 10px;
        padding: 10px 15px;
        border-bottom: 1px solid var(--border-color);
    }

    div {
        header {
            address {
                display: flex;
                gap: 5px;
                font-style: normal;

                span {
                    text-decoration: none;
                    color: var(--text-secondary);
                }
            }
        }

        span {
            font-size: 16px;
            letter-spacing: 0.2px;
            font-weight: 400;
            color: rgb(0, 0, 0);
            line-height: 20.8px;
        }
    }
</style>
