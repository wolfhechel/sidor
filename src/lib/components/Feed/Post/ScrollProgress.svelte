<script lang="ts" context="module">
    export type ScrollProgressStore = Writable<number>;

    const ScrollProgressContext = "ScrollProgress";

    /* Must be called outside lifecycle-events as it initialises a context */
    export const initScrollProgress = (): ScrollProgressStore => {
        const scrollProgress: Writable<number> = writable();

        setContext(ScrollProgressContext, scrollProgress);

        return scrollProgress;
    };

    export const scrollProgressParent: Action<
        HTMLElement,
        ScrollProgressStore
    > = (node: HTMLElement, scrollProgress: ScrollProgressStore) => {
        const onScroll = (ev: Event) => {
            scrollProgress.set((ev.target as HTMLElement).scrollTop);
        };

        node.addEventListener("scroll", onScroll);

        return {
            destroy: () => {
                node.removeEventListener("scroll", onScroll);
            },
        };
    };
</script>

<script lang="ts">
    import { createEventDispatcher, setContext, getContext } from "svelte";
    import type { Action } from "svelte/action";
    import { writable, type Writable } from "svelte/store";

    export let contentElement: HTMLElement;

    const scrollTop = getContext<Writable<number>>(ScrollProgressContext);
    const dispatch = createEventDispatcher();

    const calculateProgress = (
        element: HTMLElement,
        scrollTop: number,
    ): number => {
        let offsetTop = element.offsetTop;
        let clientHeight = element.clientHeight;

        let progress =
            Math.min(Math.max(0, scrollTop - offsetTop) / clientHeight, 1) *
            100;

        return progress;
    };

    $: progress =
        contentElement && calculateProgress(contentElement, $scrollTop);

    $: progress == 100 && dispatch("completed");
</script>

<div class="w-full h-0.5 flex">
    <div class="bg-accent" style:width={`${progress}%`}></div>
</div>
