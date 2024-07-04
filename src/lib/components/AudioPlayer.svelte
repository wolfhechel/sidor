<script lang="ts" context="module">
    export const currentAudio: Writable<HTMLAudioElement | null> =
        writable(null);
</script>

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { PointerEventHandler } from "svelte/elements";

    import Play from "virtual:icons/mdi/play";
    import Pause from "virtual:icons/mdi/pause";

    export let src: string;
    export let metadata: MediaMetadata;

    let time = 0;
    let duration = 0;
    let paused = true;

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
                window.removeEventListener("pointermove", seek);
            },
            {
                once: true,
            },
        );
    };
</script>

<div class="player" class:paused>
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
        }}
        on:ended={() => {
            time = 0;
            navigator.mediaSession.metadata = null;
        }}
    ></audio>

    <button
        class="play"
        aria-label={paused ? "play" : "pause"}
        on:click={() => (paused = !paused)}
    >
        {#if paused}
            <Play />
        {:else}
            <Pause />
        {/if}
    </button>

    <div class="info">
        <div class="time">
            <span>{format(time)}</span>
            <div class="slider" on:pointerdown={progressTrack}>
                <div
                    class="progress"
                    style="--progress: {time / duration}%"
                ></div>
            </div>
            <span>{duration ? format(duration) : "--:--"}</span>
        </div>
    </div>
</div>

<style>
    .player {
        display: grid;
        grid-template-columns: 2.5em 1fr;
        align-items: center;
        gap: 1em;
        transition: filter 0.2s;
        user-select: none;
    }

    .player:not(.paused) {
        color: var(--fg-1);
        filter: drop-shadow(0.5em 0.5em 1em rgba(0, 0, 0, 0.1));
    }

    button {
        width: 100%;
        aspect-ratio: 1;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border-radius: 50%;
        background-color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info {
        overflow: hidden;
    }

    .time {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }

    .time span {
        font-size: 0.7em;
    }

    .slider {
        flex: 1;
        height: 0.5em;
        background: var(--border-color);
        border-radius: 0.5em;
        overflow: hidden;
        touch-action: none;
    }

    .progress {
        width: calc(100 * var(--progress));
        height: 100%;
        background: var(--primary-color);
    }
</style>
