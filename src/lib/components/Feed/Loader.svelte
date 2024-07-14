<script lang="ts">
    import { inview } from "svelte-inview";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let threshold: number = 0.8;
</script>

<div
    use:inview={{ threshold }}
    on:inview_enter={() => dispatch("loaded")}
    class="text-center font-bold p-4 text-fg-secondary"
>
    Loading
</div>
