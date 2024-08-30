<script lang="ts" context="module">
    export const currentAudio: Writable<HTMLAudioElement | null> =
        writable(null);

    const MEDIA_PROGRESSION_UPDATE_INTERVAL = 5;
</script>

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { createEventDispatcher, onMount } from "svelte";
    import type { PointerEventHandler } from "svelte/elements";
    import Icon from "@iconify/svelte";

    export let src: string;
    export let metadata: MediaMetadata;
    export let seek: number = 0;

    let time = 0;
    let duration = 0;
    let paused = true;
    let updateProgressInterval: string | number | NodeJS.Timeout | undefined;

    const dispatch = createEventDispatcher();
    
    const updateMediaProgression = () => {
        dispatch("progress", {
            currentTime: time,
            duration: duration
        });
    }

    const format = (time: number): string => {
        if (isNaN(time)) return "...";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const progressTrack: PointerEventHandler<HTMLElement> = (e) => {
        const div = e.currentTarget;

        const seek = (e: PointerEvent) => {
            e.preventDefault();

            const { left, width } = div.getBoundingClientRect();

            let p = (e.clientX - left) / width;

            if (p < 0) p = 0;
            if (p > 1) p = 1;

            time = p * duration;
        };

        seek(e);

        window.addEventListener("pointermove", seek);

        window.addEventListener(
            "pointerup",
            () => {
                updateMediaProgression();
                window.removeEventListener("pointermove", seek);
            },
            {
                once: true,
            },
        );
    };

    onMount(() => {
        time = seek;
    })
</script>

<div class="flex flex-row items-center gap-4 select-none my-4">
    <audio
        {src}
        bind:currentTime={time}
        bind:duration
        bind:paused
        on:play={(e) => {
            const audio = e.currentTarget;

            if (audio !== $currentAudio) {
                $currentAudio?.pause();
                $currentAudio = audio;

                navigator.mediaSession.metadata = metadata;
            }

            updateProgressInterval = setInterval(() => {
                updateMediaProgression();
            }, 1000 * MEDIA_PROGRESSION_UPDATE_INTERVAL);
        }}
        on:pause={() => {
            clearInterval(updateProgressInterval);
            updateMediaProgression();
        }}
        on:ended={() => {
            clearInterval(updateProgressInterval);
            updateMediaProgression();
            
            navigator.mediaSession.metadata = null;
        }}
    ></audio>

    <button
        class="w-10 aspect-square flex items-center justify-center rounded-full bg-accent text-white"
        aria-label={paused ? "play" : "pause"}
        on:click={() => (paused = !paused)}
    >
        <Icon
            icon={paused ? "mdi:play" : "mdi:pause"}
            width="1.25em"
            height="1.25em"
        />
    </button>

    <div class="flex-1 flex items-center gap-2">
        <span class="text-sm">{format(time)}</span>
        <div
            class="grow h-2 bg-light-background-light rounded-lg overflow-hidden touch-none"
            on:pointerdown={progressTrack}
        >
            <div
                class="h-full bg-accent"
                style:width="{(duration > 0 ? (time / duration) : 0) * 100}%"
            ></div>
        </div>
        <span class="text-sm">{duration ? format(duration) : "--:--"}</span>
    </div>
</div>
