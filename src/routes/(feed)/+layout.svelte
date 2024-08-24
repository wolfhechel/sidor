<script lang="ts">
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";

    import { client } from "$lib/store";
    import { TabList, Tab } from "$lib/components/TabList";
    import { onMount } from "svelte";
    import { categoriesQuery } from "$lib/queries";

    let categories = categoriesQuery();

    onMount(() => {
        if (!$client.isAuthenticated) {
            goto(`${base}/connect`);
        }
    });
</script>

<div class="full flex flex-col lg:flex-row">
    <nav
        class="no-scrollbar flex overflow-x-scroll h-12 lg:h-auto lg:py-14 lg:px-8 lg:w-60 bg-light-background-light"
    >
        <TabList>
            <Tab href="/bookmarks">Bookmarks</Tab>
            <Tab href="/">Home</Tab>
            {#each $categories.data || [] as category}
                <Tab href={`/${category.id}`}>{category.title}</Tab>
            {/each}
        </TabList>
    </nav>
    <main class="overflow-x-hidden basis-full w-full lg:flex-1">
        <slot />
    </main>
</div>
