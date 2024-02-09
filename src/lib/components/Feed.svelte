<script lang="ts">
    import type { Post as PostType } from "$lib/components/Post.svelte";
    import Post from "./Post.svelte";

	let posts: PostType[] = [...Array(50).keys()].map(() => {
		return {
			id: 0,
			author: "Author",
			source: "Hacker News",
			avatar: null,
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		};
	});
</script>

{#each posts as post}
    <Post {post} />
{/each}

