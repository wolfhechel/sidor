<script lang="ts">
    import { inview } from "svelte-inview";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();
</script>

<div use:inview={{ threshold: 0.2 }} on:inview_enter={() => dispatch("loaded")}>
    Loading
</div>

<style lang="scss">
    div {
        text-align: center;
        font-weight: bold;
        padding: 15px;
        font-size: 1.25rem;
        color: var(--secondary-text-color);
    }
</style>
