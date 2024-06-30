<script lang="ts">
    import { inView } from "$lib/inview";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();
</script>

<div use:inView={0.2} on:enter={() => dispatch("loaded")}>Loading</div>

<style lang="scss">
    div {
        text-align: center;
        font-weight: bold;
        padding: 30px;
        font-size: 1.2rem;
    }
</style>
