<script lang="ts">
	import { onMount } from "svelte";
	import { currentHash } from "$lib/data";

	import "normalize.css";

	const hashchange = () => currentHash.set(window.location.hash.slice(1));

	onMount(() => {
		if (window.location.hash) {
			hashchange();
		}
	});
</script>

<svelte:window on:hashchange={hashchange} />

<!-- Page content -->
<slot />

<style lang="scss">
	@use "$lib/breakpoints";

	:global(body) {
		--border-color: #f0e9e9;
		--primary-color: #f65e1c;
		--content-size: 600px;
		--button-hover-color: rgb(243, 243, 248);
		--text-secondary: rgb(84, 86, 100);
		--background-color: #fff;
		--text-color: #000;

		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			"Open Sans",
			"Helvetica Neue",
			sans-serif;

		color: var(--text-color);
	}

	:global(html, body) {
		height: 100%;
	}
</style>
