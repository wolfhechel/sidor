<script lang="ts">
    import Feed from "$lib/components/Feed";
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<Feed endpoint="entries" globallyVisible={true} />
