<script lang="ts" context="module">
	interface Grouped<T> {
		key: string;
		entries: (T & {
			_index: number;
		})[];
	}
</script>

<script lang="ts">
	import {
		writable,
		derived,
		type Writable,
		type Readable,
	} from "svelte/store";
	import { type Category, type Entry, type Pagination } from "$lib/api";
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime";

	dayjs.extend(relativeTime);

	import Post from "./Post.svelte";
	import Loader from "./Loader.svelte";
	import { client } from "$lib/store";
	import Finished from "./Finished.svelte";

	export let category: Category;

	let limit = 10;

	$: offset = 0;
	$: total = Infinity;

	const entries: Writable<Entry[]> = writable([]);

	const groupedEntries: Readable<Grouped<Entry>[]> = derived(
		[entries],
		([$entries]) => {
			return $entries.reduce((groups, entry, idx) => {
				let value: string = dayjs(entry.published_at).from();

				let group = groups.find(({ key }) => key == value);

				if (!group) {
					groups.push({
						key: value,
						entries: [Object.assign({ _index: idx }, entry)],
					});
				} else {
					group.entries.push(Object.assign({ _index: idx }, entry));
				}

				return groups;
			}, [] as Grouped<Entry>[]);
		},
	);

	$: loadMore = $entries.length < total;

	const load = () => {
		$client
			.get<Pagination<Entry>>(`categories/${category.id}/entries`, {
				direction: "desc",
				limit: limit.toString(),
				offset: offset.toString(),
				status: ["unread"],
			})
			.then((value) => {
				if (total == Infinity) {
					total = value.total;
				}

				offset += limit;

				$entries = $entries.concat(value.entries).sort((a, b) => {
					return (
						Date.parse(b.published_at) - Date.parse(a.published_at)
					);
				});
			});
	};

	const setStatus = (
		e: CustomEvent<{ entry_id: number; status: string }>,
	) => {
		const entry_id = e.detail.entry_id;
		const status = e.detail.status;

		$client
			.put<"">(`entries`, {
				entry_ids: [entry_id],
				status,
			})
			.then((response) => {
				if (response == "") {
					let entryIndex = $entries.findIndex(
						(entry) => entry.id == entry_id,
					);

					let entry = $entries.at(entryIndex);

					if (entry) {
						entry.status = status;
						$entries[entryIndex] = entry;
					}

					$entries = $entries;
				}
			});
	};

	let el: HTMLElement;
</script>

<section id={`${category.id}`} bind:this={el}>
	<span id={`${category.id}_`}></span>
	{#each $groupedEntries as { key, entries }}
		<time>{key}</time>
		{#each entries as entry}
			<Post
				{entry}
				entryIndex={entry._index}
				on:setStatus={setStatus}
				scrollParent={el}
			/>
		{/each}
	{/each}

	{#if loadMore}
		<Loader on:loaded={load} />
	{:else}
		<Finished />
	{/if}
</section>

<style lang="scss">
	section {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 5px;
		overflow-y: scroll;
		background-color: var(--depth-0-color);

		time {
			padding: 10px 15px;
			font-weight: bold;
			font-size: 0.8rem;
			color: var(--secondary-text-color);
		}
	}
</style>
