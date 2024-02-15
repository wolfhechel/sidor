<script lang="ts">
	import type { Channel } from "$lib/data";
	import { onMount } from "svelte";
	import Post from "./Post.svelte";
	import { get, type Item } from "$lib/granary";
	import {
		writable,
		type Readable,
		type Writable,
		derived,
	} from "svelte/store";

	export let channel: Channel;

	let data: Writable<Item[]> = writable([]);

	let sortedFeed: Readable<Item[]> = derived([data], ([$data]) => {
		return $data.sort(
			(a, b) =>
				Date.parse(b.date_published) - Date.parse(a.date_published),
		);
	});

	onMount(() => {
		channel.feeds.forEach((feed) => {
			get(feed.url).then((feed) => {
				$data.push(...feed.items);

				$data = $data;
			});
		});
	});
</script>

<h1>{channel.label}</h1>

{#each $sortedFeed as post}
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
