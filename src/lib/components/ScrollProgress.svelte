<script lang="ts">
    import { onDestroy, onMount, createEventDispatcher } from "svelte";

    export let contentElement: HTMLElement;
    export let scrollParent: HTMLElement;
    export let marginBottom: number;

    $: progress = 0;

    const dispatch = createEventDispatcher();

    const onScroll = (ev: Event) => {
        let scrollTop = (ev.target as HTMLElement).scrollTop;
        let offsetTop = contentElement.offsetTop;
        let clientHeight = contentElement.clientHeight;

        let top = Math.max(0, scrollTop - offsetTop); // Amount of scroll on entry

        progress = Math.min(top / (clientHeight - marginBottom), 1) * 100;

        if (progress == 100) {
            dispatch("completed");
        }
    };

    onMount(() => {
        scrollParent.addEventListener("scroll", onScroll);
    });

    onDestroy(() => {
        scrollParent.removeEventListener("scroll", onScroll);
    });
</script>

<div>
    <div class="progress" style:width={`${progress}%`}></div>
</div>

<style lang="scss">
    div {
        width: 100%;
        height: 2px;
        display: flex;

        div.progress {
            width: 20%;
            background-color: var(--primary-color);
        }
    }
</style>
