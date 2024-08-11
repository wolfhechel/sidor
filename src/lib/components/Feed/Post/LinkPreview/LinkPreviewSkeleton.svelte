<script lang="ts">
    export let hasImage: boolean = false;
</script>

{#if hasImage}
    <div
        class="w-full h-[250px] md:h-[170px] md:w-auto md:aspect-square object-cover object-center"
    >
        <slot name="image" />
    </div>
{/if}

<div class="flex flex-col p-4 gap-2 flex-1">
    <span class="text-light-foreground-secondary text-xs"
        ><slot name="site" /></span
    >
    <span><slot name="title" /></span>
    {#if $$slots.description}
        <span class="text-light-foreground-secondary line-clamp-3"
            ><slot name="description" /></span
        >
    {/if}
</div>
