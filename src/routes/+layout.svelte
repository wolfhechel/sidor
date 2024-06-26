<script lang="ts">
	import "normalize.css";
</script>

<slot />

<style lang="scss">
	@use "$lib/breakpoints";

	:global(body) {
		--nord0: #2e3440;
		--nord1: #3b4252;
		--nord2: #434c5e;
		--nord3: #4c566a;
		--nord4: #d8dee9;
		--nord5: #e5e9f0;
		--nord6: #eceff4;
		--nord7: #8fbcbb;
		--nord8: #88c0d0;
		--nord9: #81a1c1;
		--nord10: #5e81ac;
		--nord11: #bf616a;
		--nord12: #d08770;
		--nord13: #ebcb8b;
		--nord14: #a3be8c;
		--nord15: #b48ead;

		--error-color: var(--nord11);

		--border-color: #f0e9e9;
		--primary-color: #f65e1c;
		--content-size: 600px;
		--button-hover-color: rgb(243, 243, 248);
		--text-secondary: rgb(84, 86, 100);
		--background-color: #fff;
		--text-color: #313131;

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
