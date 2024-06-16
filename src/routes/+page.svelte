<script lang="ts">
	import { type Category } from "$lib/api";
	import { categories, currentCategory, client } from "$lib/store";
	import FeedContainer from "$lib/components/FeedContainer.svelte";
	import Header from "$lib/components/Header.svelte";

	$client.get<Category[]>("categories").then(categories.set);
</script>

<svelte:head>
	<title>{$currentCategory?.title}</title>
</svelte:head>

<main>
	<Header />
	<FeedContainer />
</main>

<style lang="scss">
	@use "$lib/breakpoints";

	main {
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;

		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}

		@media screen and (min-width: breakpoints.$tablet) {
			max-width: var(--content-size);
			box-sizing: border-box;
			border-left: 1px solid var(--border-color);
			border-right: 1px solid var(--border-color);
		}

		@media screen and (min-width: breakpoints.$desktop) {
			flex-direction: row;
			width: 100%;
			max-width: unset;
		}
	}
</style>
