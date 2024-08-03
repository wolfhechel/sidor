<script lang="ts">
    import { derived, type Readable } from "svelte/store";

    import { page } from "$app/stores";
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";

    import { type Category } from "$lib/api";
    import { client } from "$lib/store";
    import PagedContainer, {
        type Page,
    } from "$lib/components/PagedContainer.svelte";
    import TabList, { type Tab } from "$lib/components/TabList.svelte";
    import Feed from "$lib/components/Feed";
    import { createQuery } from "@tanstack/svelte-query";
    import { onMount } from "svelte";

    const categories = createQuery(
        derived(client, ($client) => ({
            queryKey: ["categories"],
            queryFn: async () => $client.get<Category[]>("categories"),
        })),
    );

    type TabbedPage = Page & Tab;

    const pages: Readable<TabbedPage[]> = derived(
        [categories],
        ([$categories]) => {
            let categoryTabs: TabbedPage[];

            if ($categories.isSuccess) {
                categoryTabs = $categories.data.map((category) => ({
                    component: Feed,
                    id: category.id,
                    title: category.title,
                    properties: {
                        endpoint: `categories/${category.id}/entries`,
                        feedId: category.id.toString(),
                    },
                }));
            } else {
                categoryTabs = [];
            }

            return [
                {
                    component: Feed,
                    id: 0,
                    title: "Read Later",
                    properties: {
                        endpoint: "entries",
                        feedId: "0",
                        starred: true,
                    },
                },
                ...categoryTabs,
            ] as TabbedPage[];
        },
    );

    let currentPage: number = parseInt($page.url.hash.slice(1)) || 1;

    onMount(() => {
        if (!$client.isAuthenticated) {
            goto(`${base}/connect`);
        }
    });
</script>

<svelte:head>
    <title>{$pages.find(({ id }) => id == currentPage)?.title}</title>
</svelte:head>

<div class="full flex flex-col lg:flex-row">
    <nav
        class="no-scrollbar flex overflow-x-scroll h-12 lg:h-auto lg:py-14 lg:px-8 lg:w-60"
    >
        <TabList bind:currentTab={currentPage} tabs={$pages} />
    </nav>
    <main class="overflow-x-hidden basis-full w-full lg:flex-1">
        <PagedContainer
            bind:currentPage
            pages={$pages}
            on:pageChanged={(e) => {
                window.location.hash = `#${e.detail}`;
            }}
        />
    </main>
</div>
