<script lang="ts">
    import { onMount } from "svelte";
    import { profile, client } from "$lib/store";
    import { connectLocalStorage } from "$lib/localstorage";

    import Connect from "$lib/layouts/Connect.svelte";
    import Reader from "$lib/layouts/Reader.svelte";

    onMount(() => {
        connectLocalStorage(profile, "profile");
    });
</script>

{#if $client.isAuthenticated}
    <Reader />
{:else}
    <Connect />
{/if}
