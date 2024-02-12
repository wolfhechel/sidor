<script lang="ts">
	import type { FeedItem } from "$lib/components/FeedTabList.svelte";
	import FeedTabList from "$lib/components/FeedTabList.svelte";

	import Feed from "$lib/components/Feed.svelte";
    import Settings from "$lib/components/Settings.svelte";

	const feeds: FeedItem[] = [
		{
			id: "all",
			name: "All",
		},
		{
			id: "developers",
			name: "Developers",
		},
		{
			id: "github",
			name: "Github"
		},
		{
			id: "podcasts",
			name: "Podcasts"
		},
		{
			id: "reddit",
			name: "Reddit"
		},
		{
			id: "newsletters",
			name: "Newsletters"
		},
		{
			id: "datajournalism",
			name: "Datajournalism"
		}
	];

	const scroll = (ev: Event) => {
		let el: HTMLElement = ev.target as HTMLElement;

		let feedIndex = Math.round(el.scrollLeft / el.clientWidth);
		let activeFeed = feeds.at(feedIndex);

		window.location.hash = `#${activeFeed?.id}`;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<header>
		<nav>
			<FeedTabList {feeds} />
		</nav>

		<aside>
			<Settings />
		</aside>
	</header>

	<ul dir="ltr" on:scrollend={scroll}>
	{#each feeds as feed}
		<li id={feed.id}>
			<Feed {feed} />
		</li>
	{/each}
	</ul>
</main>

<style lang="scss">
	@use "$lib/breakpoints";

	main {
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		width: fit-content;
		max-width: 100%;

		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	header {
		position: sticky;
		top: 0;
		background-color: white;
		height: 45px;
		border-bottom: 1px solid var(--border-color);
		display: flex;
		gap: 5px;
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

	ul {
		margin: 0;
		padding: 0;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		display: flex;
		height: 100%;
		width: 100%;
		overflow-y: hidden;
		scroll-behavior: smooth;

		li {
			list-style-type: none;
			flex: none;
			max-width: 100%;
			scroll-snap-align: start;
			scroll-snap-stop: always;
			overflow-y: scroll;
		}
	}

	aside {
		width: 42px;
	}

	ul,
	header {
		max-width: 600px;
		box-sizing: border-box;
		border-left: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}

	@media screen and (min-width: breakpoints.$desktop) {
		main {
			flex-direction: row;
			width: 100%;
		}

		header {
			display: contents;
			
			nav {
				order: 2;
			}

			aside {
				order: 0;
			}

			nav, aside {
				width: auto;
				flex: 1;
				padding-top: 60px;
			}
		}
	}
</style>
