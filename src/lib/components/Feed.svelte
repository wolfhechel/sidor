<script lang="ts">
    import type { Post as PostType } from "$lib/components/Post.svelte";
    import type { FeedItem } from "./FeedTabList.svelte";
    import Post from "./Post.svelte";

	export let feed: FeedItem;

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


<h1>{feed.name}</h1>
{#each posts as post}
    <Post {post} />
{/each}


<style lang="scss">
	@use "$lib/breakpoints";

	h1 {
		display: none;
	}

	@media screen and (min-width: breakpoints.$desktop) {
		h1 {
			display: block;
			margin: 0;
			padding: 15px;
			border-bottom: 1px solid var(--border-color);
			margin: 0;
			top: 0;
			position: sticky;
			background-color: var(--background-color);
			font-size: 1.5em;
			height: 60px;
			box-sizing: border-box;
		}
	}
</style>