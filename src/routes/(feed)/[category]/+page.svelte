<script lang="ts">
    import { page } from "$app/stores";
    import type { Category } from "$lib/api";
    import Feed from "$lib/components/Feed";
    import { categoriesQuery } from "$lib/queries";
    import { derived, type Readable } from "svelte/store";

    const categories = categoriesQuery();

    const category: Readable<Category | undefined> = derived([categories, page], ([$categories, $page]) => {
        let categoryId = parseInt($page.params.category);

        return $categories.data?.find((category) => category.id == categoryId);
    })
</script>

<svelte:head>
    <title>{$category?.title}</title>
</svelte:head>

{#key $category?.id}
    <Feed endpoint={`categories/${$category?.id}/entries`} />
{/key}