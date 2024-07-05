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
		selectedStatus: string,
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
</script>

<section id={`${feedId}`} use:scrollProgressParent={scrollProgress}>
	{#if selectedStatus}
		<menu id={`${feedId}_`}>
			{#each [["unread", "Unread"], ["read", "Read"], ["removed", "Deleted"]] as [status, label]}
				<li>
					<label>
						<input
							type="radio"
							bind:group={selectedStatus}
							value={status}
						/>
						{label}
					</label>
				</li>
			{/each}
		</menu>
	{/if}

	{#each $groupedEntries as { key, entries }}
		<time>{key}</time>
		{#each entries as { index, obj }}
			<Post entry={obj} entryIndex={index} {feedId} />
		{/each}
	{/each}

	{#if $entries.length < total}
		<Loader on:loaded={() => load(endpoint, selectedStatus, starred)} />
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

		menu {
			padding: 0;
			margin: 0;
			display: flex;
			background-color: var(--depth-1-color);

			li {
				list-style-type: none;
				flex: 1;

				label {
					display: block;
					white-space: nowrap;
					color: var(--text-color);
					text-decoration: none;
					text-align: center;
					letter-spacing: 0.25px;
					border-bottom: 2px solid transparent;
					padding: 5px 15px;

					&:hover {
						background-color: var(--button-hover-color);
					}

					&:has(input:checked) {
						border-color: var(--primary-color);
					}

					input {
						visibility: hidden;
						appearance: none;
					}
				}
			}
		}

		time {
			padding: 10px 15px;
			font-weight: bold;
			font-size: 0.8rem;
			color: var(--secondary-text-color);
		}
	}
</style>
