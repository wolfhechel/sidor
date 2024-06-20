<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import { type Category, type Entry, type Pagination } from "$lib/api";

	import Post from "./Post.svelte";
	import Loader from "./Loader.svelte";
	import { client, pageVisibile } from "$lib/store";

	export let category: Category;

	let latestLoad: number;

	let limit = 10;

	$: offset = 0;
	$: total = Infinity;

	let entries: Writable<Entry[]> = writable([]);

	const reloadAfter = 5 * 60 * 1000;

	$: loadMore = $entries.length < total;

	const resetFeed = () => {
		total = Infinity;
		offset = 0;
		$entries = [];
	};

	const needRefresh = () => {
		if (latestLoad + reloadAfter < Date.now()) {
			resetFeed();
		}
	};

	$: $pageVisibile && needRefresh();

	const load = () => {
		$client
			.get<Pagination<Entry>>(`categories/${category.id}/entries`, {
				direction: "desc",
				limit: limit.toString(),
				offset: offset.toString(),
				status: ["unread", "read"],
			})
			.then((value) => {
				if (total == Infinity) {
					total = value.total;
				}

				offset += limit;

				$entries = $entries.concat(value.entries).sort((a, b) => {
					return Date.parse(b.changed_at) - Date.parse(a.changed_at);
				});

				latestLoad = Date.now();
			});
	};
</script>

<h1>{category.title}</h1>

<section>
	{#each $entries as entry}
		<Post {entry} />
	{/each}
</section>

{#if loadMore}
	<Loader on:loaded={load} />
{/if}

<style lang="scss">
	@use "$lib/breakpoints";

	h1 {
		display: none;

		@media screen and (min-width: breakpoints.$desktop) {
			display: block;
			margin: 0;
			padding: 15px;
			border-bottom: 1px solid var(--border-color);
			margin: 0;
			top: 0;
			position: sticky;
			z-index: 1;
			background-color: var(--background-color);
			font-size: 1.5em;
			height: 60px;
			box-sizing: border-box;
		}
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
