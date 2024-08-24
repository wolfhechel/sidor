<script lang="ts">
    import { page } from "$app/stores";

    export let href: string;
    
    $: isCurrent = $page.url.pathname == href;
</script>

<li class="flex flex-1 lg:flex-none">
    <a
        {href}
        class="flex flex-1 items-center justify-center whitespace-nowrap px-4 border-b-2 border-transparent aria-selected:border-accent lg:justify-start lg:py-2 lg:border-l-2 lg:border-b-0"
        aria-selected={isCurrent}
        role="tab"
        aria-controls="tabpanel"><span><slot /></span></a
    >
</li>