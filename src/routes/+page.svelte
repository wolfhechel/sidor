<script lang="ts">
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";

    import { page } from "$app/stores";
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";

    import { type Category } from "$lib/api";
    import { client } from "$lib/store";
    import Feed from "$lib/components/Feed.svelte";
    import PagedContainer, {
        type Page,
    } from "$lib/components/PagedContainer.svelte";
    import TabList, { type Tab } from "$lib/components/TabList.svelte";
    import CollapsedLayout from "$lib/components/CollapsedLayout.svelte";

    const reloadAfter = 10 * 60 * 1000;
    let latestLoad: number;

    const categories: Writable<Category[]> = writable([]);

    const update = () => {
        $client
            .get<Category[]>("categories")
            .then(categories.set)
            .then(() => {
                latestLoad = Date.now();
            })
            .catch((reason) => {
                if (!$client.isAuthenticated) {
                    goto(`${base}/connect`);
                } else {
                    console.error(reason);
                }
            });
    };

    const needsRefresh = (): boolean => latestLoad + reloadAfter < Date.now();

    const refreshIfNeeded = () => {
        if (needsRefresh()) {
            $categories = [];
            update();
        }
    };

    $: pages = $categories.map((category) => {
        let page: Page & Tab = {
            component: Feed,
            id: category.id,
            title: category.title,
            properties: {
                category,
            },
        };

        return page;
    });

    let currentPage: number = parseInt($page.url.hash.slice(1)) || 1;

    update();

    onMount(() => {
        document.addEventListener(
            "visibilitychange",
            () => !document.hidden && refreshIfNeeded(),
        );
    });

    const pageChanged = (e: CustomEvent<number>) => {
        window.location.hash = `#${e.detail}`;
    };
</script>

<svelte:head>
    <title>{pages.find(({ id }) => id == currentPage)?.title}</title>
</svelte:head>

<CollapsedLayout>
    <TabList slot="nav" bind:currentTab={currentPage} tabs={pages} />
    <PagedContainer
        slot="main"
        bind:currentPage
        {pages}
        on:pageChanged={pageChanged}
    />
</CollapsedLayout>
