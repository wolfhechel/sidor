<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";

    let el: HTMLElement;

    let dispatch = createEventDispatcher();

    let observer: IntersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting) {
                dispatch("loaded");
            }
        },
    );

    onMount(() => {
        observer.observe(el);
    });

    onDestroy(() => {
        observer.disconnect();
    });
</script>

<div bind:this={el}>Loading</div>

<style lang="scss">
    div {
        text-align: center;
        font-weight: bold;
        padding: 30px;
        font-size: 1.2rem;
    }
</style>
