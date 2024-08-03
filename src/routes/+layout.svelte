<script lang="ts">
	import "$lib/root.css";
	import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";

	const client = new QueryClient();
</script>

<QueryClientProvider {client}>
	<slot />
</QueryClientProvider>
