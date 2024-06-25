<script lang="ts" context="module">
	interface Grouped<T> {
		key: string;
		entries: (T & {
			_index: number;
		})[]
	};
</script>

<script lang="ts">
	import { writable, derived, type Writable, type Readable } from "svelte/store";
	import { type Category, type Entry, type Pagination } from "$lib/api";
	import dayjs from "dayjs";

	import Post from "./Post.svelte";
	import Loader from "./Loader.svelte";
	import { client } from "$lib/store";

	export let category: Category;

	let limit = 10;

	$: offset = 0;
	$: total = Infinity;

	const entries: Writable<Entry[]> = writable([]);

	const groupedEntries: Readable<Grouped<Entry>[]> = derived([entries], ([$entries]) => {
		return $entries.reduce((groups, entry, idx) => {
			let value: string = dayjs(entry.published_at).from();

			let group = groups.find(({ key }) => key == value);

			if (!group) {
				groups.push({
					key: value,
					entries: [
						Object.assign({ _index: idx }, entry)
					]
				})
			} else {
				group.entries.push(Object.assign({ _index: idx }, entry));
			}

			return groups;
		}, [] as Grouped<Entry>[]);
	});

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
					return Date.parse(b.published_at) - Date.parse(a.published_at);
				});
			});
	};
</script>

<section>
	{#each $groupedEntries as { key, entries }}
	<time>{key}</time>
	{#each entries as entry}
		<div id={`${category.id}-${entry._index}`}>
			<Post {entry} />
		</div>
	{/each}
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
		padding-top: 5px;

		time {
			padding: 10px 15px;
			font-weight: bold;
			font-size: 0.8rem;
			color: #636363;
		}
	}
</style>
