<script lang="ts">
    import { inview } from "svelte-inview";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let threshold: number = 0.8;
</script>

<div use:inview={{ threshold }} on:inview_enter={() => dispatch("loaded")}>
    Loading
</div>

<style lang="scss">
    div {
        text-align: center;
        font-weight: bold;
        padding: 16px;
        color: var(--secondary-text-color);
    }
</style>
