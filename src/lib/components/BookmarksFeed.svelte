<script>
    import Feed from "./Feed.svelte";
</script>

<Feed
    endpoint="entries"
    feedId="0"
    params={{
        starred: "true",
    }}
/>
