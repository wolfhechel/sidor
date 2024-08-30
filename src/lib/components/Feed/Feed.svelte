<script lang="ts">
	import { derived, type Readable } from "svelte/store";

	import { client } from "$lib/store";
	import { type Entry, type Pagination } from "$lib/api";
	import { sortByTime, relativeTimeToGroup } from "$lib/utils/time";
	import groupBy, { type Grouped } from '$lib/utils/groupBy';

	import { Post, initScrollProgress, scrollProgressParent } from "./Post";

	import Loader from "./Loader.svelte";
	import Finished from "./Finished.svelte";
	import GroupLabel from "./GroupLabel.svelte";
	import {
		createInfiniteQuery,
		createMutation,
		useQueryClient,
		type InfiniteData,
		type QueryKey,
	} from "@tanstack/svelte-query";

	export let endpoint: string;
	export let starred: boolean | undefined = undefined;
	export let globallyVisible: boolean | undefined = undefined;

	const scrollProgress = initScrollProgress();

	const pagesConcatenated = (pages: Pagination<Entry>[]): Entry[] => {
		return pages.reduce((allEntries, { entries }) => {
			return allEntries.concat(entries);
		}, [] as Entry[]);
	};

	const query = createInfiniteQuery(
		derived(client, ($client) => ({
			queryKey: [endpoint],
			queryFn: async ({ pageParam }: { pageParam: number }) => {
				let params: Record<string, string | string[]> = {
					direction: "desc",
					limit: "4",
					offset: pageParam.toString(),
					status: ["read", "unread"],
				};

				if (starred !== undefined) {
					params["starred"] = starred ? "true" : "false";
				}

				if (globallyVisible != undefined) {
					params["globally_visible"] = starred ? "true": "false";
				}

				return await $client.get<Pagination<Entry>>(endpoint, params);
			},
			initialPageParam: 0,
			getNextPageParam: (
				lastPage: Pagination<Entry>,
				allPages: Pagination<Entry>[],
			) => {
				let numEntries = pagesConcatenated(allPages).length;

				return numEntries < lastPage.total ? numEntries : null;
			},
		})),
	);

	const groupedEntries: Readable<Grouped<Entry>[]> = derived(
		[query],
		([$query]) => {
			let allEntries: Entry[] = pagesConcatenated($query.data?.pages || []);

			allEntries = sortByTime(allEntries, "published_at");

			return groupBy(allEntries, "published_at", relativeTimeToGroup);
		},
	);

	const queryClient = useQueryClient();

	const stallCacheWhileMutate = async (
		queryKey: QueryKey,
		id: number,
		callback: (entry: Entry) => boolean,
	) => {
		await queryClient.cancelQueries({
			queryKey,
		});

		queryClient.setQueryData(
			queryKey,
			(data: InfiniteData<Pagination<Entry>, number>) => {
				let entry: Entry | undefined;

				for (const feed of data.pages) {
					entry = feed.entries.find((entry) => entry.id == id);

					if (entry && callback(entry)) {
						break;
					}
				}

				return data;
			},
		);
	};

	const updateEntryStatus = createMutation<
		void,
		Error,
		{
			detail: {
				id: number;
				status: string;
			};
		},
		void
	>({
		mutationFn: async ({ detail }) => {
			await $client.put<"">(`entries`, {
				entry_ids: [detail.id],
				status: detail.status,
			});
		},
		onMutate: async ({ detail }) => {
			await stallCacheWhileMutate(
				[endpoint],
				detail.id,
				(entry) => {
					entry.status = detail.status as typeof entry.status;

					return true;
				},
			);
		},
	});

	const updateEntryStarred = createMutation<
		void,
		Error,
		{
			detail: {
				id: number;
			};
		},
		void
	>({
		mutationFn: async ({ detail }) => {
			await $client.put(`entries/${detail.id}/bookmark`, {});
		},
		onMutate: async ({ detail }) => {
			await stallCacheWhileMutate(
				[endpoint],
				detail.id,
				(entry) => {
					entry.starred = !entry.starred;

					return true;
				},
			);
		},
	});

	const updateEnclosureMediaProgression = createMutation<
		void,
		Error,
		{
			detail: {
				enclosureId: number;
				entryId: number;
				time: number;
			};
		},
		void
	>({
		mutationFn: async ({ detail }) => {
			await $client.put(`enclosures/${detail.enclosureId}`, {
				media_progression: detail.time
			});
		},
		onMutate: async ({ detail }) => {
			await stallCacheWhileMutate(
				[endpoint],
				detail.entryId,
				(entry) => {
					let enclosure = entry.enclosures.find((enclosure) => enclosure.id == detail.enclosureId);

					if (enclosure) {
						enclosure.media_progression = detail.time;
					}

					return true;
				},
			);
		},
	});
</script>

<section
	use:scrollProgressParent={scrollProgress}
	class="full flex flex-col overflow-y-scroll scroll-smooth no-scrollbar gap-2"
>
	{#each $groupedEntries as { key, entries } (key)}
		<GroupLabel label={key} />
		{#each entries as { index, obj } (obj.id)}
			<Post
				entry={obj}
				entryIndex={index}
				on:setStatus={$updateEntryStatus.mutate}
				on:toggleBookmark={$updateEntryStarred.mutate}
				on:updateMediaProgression={$updateEnclosureMediaProgression.mutate}
			/>
		{/each}
	{/each}
	{#if $query.hasNextPage}
		<Loader on:loaded={() => $query.fetchNextPage()} />
	{:else}
		<Finished />
	{/if}
</section>
