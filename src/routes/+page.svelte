<script lang="ts">
    import { client } from "$lib/store";

    import Connect from "$lib/layouts/Connect.svelte";
    import Reader from "$lib/layouts/Reader.svelte";
</script>

{#if $client.isAuthenticated}
    <Reader />
{:else}
    <Connect />
{/if}
