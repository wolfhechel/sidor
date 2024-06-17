<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import { type Category, type Entry, type Pagination } from "$lib/api";

	import Post from "./Post.svelte";
	import Loader from "./Loader.svelte";
	import { client } from "$lib/store";

	export let category: Category;

	$: limit = 10;
	$: offset = 0;
	$: total = Infinity;

	let entries: Writable<Entry[]> = writable([]);

	$: loadMore = $entries.length < total;

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

				$entries = $entries.concat(value.entries);
			});
	};
</script>

<h1>{category.title}</h1>

{#each $entries as entry}
	<Post {entry} />
{/each}

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
</style>
