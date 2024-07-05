<script lang="ts">
	import {
		writable,
		derived,
		type Writable,
		type Readable,
	} from "svelte/store";

	import { client } from "$lib/store";
	import { type Entry, type Pagination } from "$lib/api";
	import { groupByTime, type Grouped } from "$lib/utils";
	import {
		initScrollProgress,
		scrollProgressParent,
	} from "./ScrollProgress.svelte";

	import Post from "./Post.svelte";
	import Loader from "./Loader.svelte";
	import Finished from "./Finished.svelte";

	export let endpoint: string;
	export let feedId: string;
	export let params: { [key: string]: string | string[] };

	const scrollProgress = initScrollProgress();

	const limit = 10;
	const entries: Writable<Entry[]> = writable([]);
	const groupedEntries: Readable<Grouped<Entry>[]> = derived(
		[entries],
		([$entries]) => {
			return groupByTime($entries, "published_at");
		},
	);

	$: offset = 0;
	$: total = Infinity;

	const load = () => {
		$client
			.get<Pagination<Entry>>(
				endpoint,
				Object.assign(
					{
						direction: "desc",
						limit: limit.toString(),
						offset: offset.toString(),
					},
					params,
				),
			)
			.then((value) => {
				if (total == Infinity) {
					total = value.total;
				}

				offset += limit;

				$entries = $entries.concat(value.entries);
			});
	};
</script>

<section id={`${feedId}`} use:scrollProgressParent={scrollProgress}>
	<span id={`${feedId}_`}></span>
	{#each $groupedEntries as { key, entries }}
		<time>{key}</time>
		{#each entries as { index, obj }}
			<Post entry={obj} entryIndex={index} {feedId} />
		{/each}
	{/each}

	{#if $entries.length < total}
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
		scroll-behavior: smooth;

		time {
			padding: 10px 15px;
			font-weight: bold;
			font-size: 0.8rem;
			color: var(--secondary-text-color);
		}
	}
</style>
