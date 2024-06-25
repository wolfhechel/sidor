<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import { type Category, type Entry, type Pagination } from "$lib/api";

	import Post from "./Post.svelte";
	import Loader from "./Loader.svelte";
	import { client } from "$lib/store";

	export let category: Category;

	let limit = 10;

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

				$entries = $entries.concat(value.entries).sort((a, b) => {
					return Date.parse(b.changed_at) - Date.parse(a.changed_at);
				});
			});
	};
</script>

<section>
	{#each $entries as entry, idx}
		<div id={`${category.id}-${idx}`}>
			<Post {entry} />
		</div>
	{/each}
</section>

{#if loadMore}
	<Loader on:loaded={load} />
{/if}

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
