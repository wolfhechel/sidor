<script lang="ts">
    import { inView } from "$lib/inview";

    $: isVisible = false;
</script>

<div use:inView on:enter={() => (isVisible = true)}>
    {#if isVisible}
        <slot />
    {/if}
</div>
