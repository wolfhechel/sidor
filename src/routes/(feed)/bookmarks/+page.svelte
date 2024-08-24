<script lang="ts">
    import Feed from "$lib/components/Feed";
</script>

<svelte:head>
    <title>Bookmarks</title>
</svelte:head>

<Feed endpoint="entries" starred={true} />