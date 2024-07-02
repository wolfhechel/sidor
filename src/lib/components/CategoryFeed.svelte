<script lang="ts">
    import type { Category } from "$lib/api";
    import Feed from "./Feed.svelte";

    export let category: Category;
</script>

<Feed
    endpoint={`categories/${category.id}/entries`}
    feedId={category.id.toString()}
    params={{
        status: ["unread"],
    }}
/>
