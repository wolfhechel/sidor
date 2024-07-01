<script lang="ts">
    import { inview } from "svelte-inview";

    $: isVisible = false;
</script>

<div use:inview on:inview_enter={() => (isVisible = true)}>
    {#if isVisible}
        <slot />
    {/if}
</div>
