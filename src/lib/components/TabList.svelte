<script lang="ts" context="module">
    export interface Tab {
        title: string;
        id: number;
    }
</script>

<script lang="ts">
    export let tabs: Tab[];
    export let currentTab: number;
</script>

<menu class="inline-flex w-full lg:flex-col">
    {#each tabs as tab}
        {@const isCurrent = currentTab == tab.id}

        <li class="flex flex-1 lg:flex-none">
            <a
                href="#{tab.id}"
                class="flex flex-1 items-center justify-center whitespace-nowrap px-4 border-b-2 border-transparent aria-selected:border-accent lg:justify-start lg:py-2 lg:border-l-2 lg:border-b-0"
                aria-selected={isCurrent}
                role="tab"
                aria-controls="tabpanel"><span>{tab.title}</span></a
            >
        </li>
    {/each}
</menu>
