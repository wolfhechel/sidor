<script lang="ts">
	import { onMount } from "svelte";
	import { writable, type Writable } from "svelte/store";
	import { type Category } from "$lib/api";
	import { client } from "$lib/store";

	import Feed from "$lib/components/Feed.svelte";

	import PagedContainer, {
		type Page,
	} from "$lib/components/PagedContainer.svelte";
	import TabList, { type Tab } from "$lib/components/TabList.svelte";
	import ContextMenu from "$lib/components/ContextMenu.svelte";

	const reloadAfter = 10 * 60 * 1000;
	let latestLoad: number;

	const categories: Writable<Category[]> = writable([]);

	const update = () => {
		$client
			.get<Category[]>("categories")
			.then(categories.set)
			.then(() => {
				latestLoad = Date.now();
			});
	};

	const needsRefresh = (): boolean => latestLoad + reloadAfter < Date.now();

	const refreshIfNeeded = () => {
		if (needsRefresh()) {
			$categories = [];
			update();
		}
	};

	$: pages = $categories.map((category) => {
		let page: Page & Tab = {
			component: Feed,
			id: category.id,
			title: category.title,
			properties: {
				category,
			},
		};

		return page;
	});

	let currentPage: number = parseInt(window.location.hash.slice(1)) || 1;

	update();

	onMount(() => {
		document.addEventListener(
			"visibilitychange",
			() => !document.hidden && refreshIfNeeded(),
		);
	});

	const pageChanged = (e: CustomEvent<number>) => {
		window.location.hash = `#${e.detail}`;
	};
</script>

<svelte:head>
	<title>{pages.find(({ id }) => id == currentPage)?.title}</title>
</svelte:head>

<main>
	<header>
		<nav>
			<TabList bind:currentTab={currentPage} tabs={pages} />
		</nav>
		<aside>
			<ContextMenu />
		</aside>
	</header>

	<PagedContainer bind:currentPage {pages} on:pageChanged={pageChanged} />
</main>

<style lang="scss">
	@use "$lib/breakpoints";

	main {
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column-reverse;
		width: 100%;
		justify-content: center;

		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}

		@media screen and (min-width: breakpoints.$tablet) {
			max-width: var(--content-size);
		}

		@media screen and (min-width: breakpoints.$desktop) {
			flex-direction: row;
			width: 100%;
			max-width: unset;
		}
	}

	header {
		position: sticky;
		top: 0;
		background-color: white;
		height: 45px;
		border-top: 1px solid var(--border-color);
		display: flex;
		gap: 5px;

		@media screen and (min-width: breakpoints.$desktop) {
			display: contents;

			nav {
				order: 2;
			}

			aside {
				order: 0;
			}

			nav,
			aside {
				width: auto;
				flex: 1;
				padding-top: 60px;
			}
		}
	}

	nav {
		display: flex;
		overflow-x: scroll;
		flex: 1;
		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	aside {
		width: 42px;
	}
</style>
