<script lang="ts">
    import {
        derived,
        writable,
        type Readable,
        type Writable,
    } from "svelte/store";

    import { page } from "$app/stores";
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";

    import { type Category } from "$lib/api";
    import { client } from "$lib/store";
    import PagedContainer, {
        type Page,
    } from "$lib/components/PagedContainer.svelte";
    import TabList, { type Tab } from "$lib/components/TabList.svelte";
    import CollapsedLayout from "$lib/components/CollapsedLayout.svelte";
    import CategoryFeed from "$lib/components/CategoryFeed.svelte";
    import BookmarksFeed from "$lib/components/BookmarksFeed.svelte";

    const reloadAfter = 10 * 60 * 1000;

    let latestLoad: number;

    const categories: Writable<Category[]> = writable([]);

    type TabbedPage = Page & Tab;
    const pages: Readable<TabbedPage[]> = derived(
        [categories],
        ([$categories]) => {
            let bookmarksPage: TabbedPage = {
                component: BookmarksFeed,
                id: 0,
                title: "★",
                properties: {},
            };

            let categoryPages: TabbedPage[] = $categories.map((category) => {
                return {
                    component: CategoryFeed,
                    id: category.id,
                    title: category.title,
                    properties: {
                        category,
                    },
                };
            });

            return [bookmarksPage, ...categoryPages];
        },
    );

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

    let currentPage: number = parseInt($page.url.hash.slice(1)) || 1;

    update();
</script>

<svelte:head>
    <title>{$pages.find(({ id }) => id == currentPage)?.title}</title>
</svelte:head>

<svelte:document
    on:visibilitychange={() => {
        !document.hidden && refreshIfNeeded();
    }}
/>

<CollapsedLayout>
    <TabList slot="nav" bind:currentTab={currentPage} tabs={$pages} />
    <PagedContainer
        slot="main"
        bind:currentPage
        pages={$pages}
        on:pageChanged={(e) => {
            window.location.hash = `#${e.detail}`;
        }}
    />
</CollapsedLayout>
