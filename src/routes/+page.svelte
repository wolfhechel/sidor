<script lang="ts">
	import { onMount } from "svelte";

	import { channels, currentChannel } from "$lib/data";

	import FeedTabList from "$lib/components/FeedTabList.svelte";
	import Feed from "$lib/components/Feed.svelte";
	import Settings from "$lib/components/Settings.svelte";
	import { connectLocalStorage } from "$lib/localstorage";
	import Empty from "$lib/components/Empty.svelte";

	const scroll = (ev: Event) => {
		let el: HTMLElement = ev.target as HTMLElement;

		let pageIndex = Math.round(el.scrollLeft / el.clientWidth);
		let targetChannel = $channels.at(pageIndex);

		window.location.hash = `#${targetChannel?.id}`;
	};

	let feedContainer: HTMLElement;

	onMount(() => {
		connectLocalStorage(channels, "channels");

		currentChannel.subscribe((value) => {
			if (!value || !feedContainer) {
				return;
			}

			let channelIndex = $channels.indexOf(value);
			let channelEl: HTMLElement = feedContainer.childNodes[
				channelIndex
			] as HTMLElement;

			channelEl.scrollIntoView({
				behavior: "smooth",
				inline: "nearest",
			});
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<header>
		<nav>
			<FeedTabList />
		</nav>

		<aside>
			<Settings />
		</aside>
	</header>

	<ul dir="ltr" on:scrollend={scroll} bind:this={feedContainer}>
		{#if $channels.length > 0}
			{#each $channels as channel}
				<li>
					<Feed {channel} />
				</li>
			{/each}
		{:else}
			<li>
				<Empty />
			</li>
		{/if}
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
		box-sizing: border-box;
		border-left: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}

	@media screen and (min-width: breakpoints.$tablet) {
		ul,
		header {
			max-width: 600px;
		}
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

			nav,
			aside {
				width: auto;
				flex: 1;
				padding-top: 60px;
			}
		}
	}
</style>
