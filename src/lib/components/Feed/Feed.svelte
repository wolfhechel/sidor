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

	import { Post, initScrollProgress, scrollProgressParent } from "./Post";

	import StatusMenu from "./StatusMenu.svelte";
	import Loader from "./Loader.svelte";
	import Finished from "./Finished.svelte";
	import GroupLabel from "./GroupLabel.svelte";

	export let endpoint: string;
	export let feedId: string;
	export let starred: boolean = false;
	export let selectedStatus: string | undefined = undefined;

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

	const reset = () => {
		total = Infinity;
		offset = 0;
		$entries = [];
	};

	$: selectedStatus && reset();

	const load = (
		endpoint: string,
		selectedStatus: string | undefined,
		starred: boolean,
	) => {
		let params: Record<string, string | string[]> = {
			direction: "desc",
			limit: limit.toString(),
			offset: offset.toString(),
			starred: starred ? "true" : "false",
		};

		if (selectedStatus) {
			params["status"] = [selectedStatus];
		}

		$client.get<Pagination<Entry>>(endpoint, params).then((value) => {
			if (total == Infinity) {
				total = value.total;
			}

			offset += limit;

			$entries = $entries.concat(value.entries);
		});
	};

	const setEntryStatus = ({
		detail: { id, status },
	}: {
		detail: {
			id: number;
			status: string;
		};
	}) => {
		$client
			.put<"">(`entries`, {
				entry_ids: [id],
				status,
			})
			.then(() => {
				let entry = $entries.find((entry) => entry.id == id);

				if (entry) {
					entry.status = status;
				}

				$entries = $entries;
			});
	};

	const toggleEntryBookmark = ({
		detail: { id },
	}: {
		detail: {
			id: number;
		};
	}) => {
		$client.put(`entries/${id}/bookmark`, {}).catch(() => {
			let entry = $entries.find((entry) => entry.id == id);

			if (entry) {
				entry.starred = !entry.starred;
			}

			$entries = $entries;
		});
	};
</script>

<section
	id={`${feedId}`}
	use:scrollProgressParent={scrollProgress}
	class="full flex flex-col overflow-y-scroll scroll-smooth no-scrollbar"
>
	{#if selectedStatus}
		<StatusMenu bind:selectedStatus />
	{/if}

	{#each $groupedEntries as { key, entries }}
		<GroupLabel label={key} />
		{#each entries as { index, obj }}
			<Post
				entry={obj}
				entryIndex={index}
				{feedId}
				on:setStatus={setEntryStatus}
				on:toggleBookmark={toggleEntryBookmark}
			/>
		{/each}
	{/each}

	{#if $entries.length < total}
		<Loader on:loaded={() => load(endpoint, selectedStatus, starred)} />
	{:else}
		<Finished />
	{/if}
</section>
