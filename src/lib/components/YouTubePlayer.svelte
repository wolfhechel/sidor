<script lang="ts" context="module">
    declare namespace YT {
        enum PlayerState {
            UNSTARTED = -1,
            ENDED,
            PLAYING,
            PAUSED,
            BUFFERING,
            CUED,
        }

        type ValueOf<T> = T[keyof T];

        interface PlayerOptions {
            width: number;
            height: number;
            videoId: string;
            host?: string;
            playerVars?: {
                /* https://developers.google.com/youtube/player_parameters */
                autoplay?: 0 | 1;
                start?: number;
            };
            events?: {
                onReady?: (event: { target: Player }) => void;
                onStateChange?: (event: {
                    data: PlayerState;
                    target: Player;
                }) => void;
            };
        }

        interface Player {
            playVideo(): void;
            pauseVideo(): void;
            stopVideo(): void;
            seekTo(seconds: number, allowSeekAhead: boolean): void;
            getVideoLoadedFraction(): number;
            getPlayerState(): PlayerState;
            getCurrentTime(): number;
            getDuration(): number;
            getVideoUrl(): string;
            getVideoEmbedCode(): string;
            addEventListener(event: string, listener: string | Function): void;
            removeEventListener(
                event: string,
                listener: string | Function,
            ): void;
            destroy(): void;

            new (element: HTMLElement | string, options: PlayerOptions): Player;
        }

        var Player: {
            prototype: Player;
            new (
                element: HTMLElement | string,
                playerOptions: PlayerOptions,
            ): Player;
        };
    }

    import { writable, type Writable } from "svelte/store";

    export const currentPlayer: Writable<YT.Player | null> = writable(null);

    const parseYouTubeId = (url: string): string => {
        let youtubeId = url;
        let matches: RegExpMatchArray | null;

        if (
            (matches = url.match(
                "^https?://www.youtube[-a-z]*.com/v/([-_a-zA-Z0-9]*).*$",
            ))
        ) {
            youtubeId = matches[1];
        }

        return youtubeId;
    };
</script>

<script lang="ts">
    export let url: string;
    export let thumbnail: string;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let videoId: string = parseYouTubeId(url);

    let player;

    let el: HTMLElement;

    const metadata: Promise<{
        title: string;
        author_name: string;
        author_url: string;
        height: number;
        width: number;
        thumbnail_height: number;
        thumbnail_width: number;
        thumbnail_url: string;
        html: string;
    }> = fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    ).then((response) => response.json());

    function load(height: number, width: number) {
        player = new YT.Player(el, {
            height: height,
            width: width,
            host: "https://www.youtube-nocookie.com",
            videoId: parseYouTubeId(url),
            events: {
                onReady: (event) => {
                    event.target.playVideo();
                },
                onStateChange: ({ data, target }) => {
                    switch (data) {
                        case YT.PlayerState.PLAYING:
                            {
                                dispatch("playing", target);

                                if (
                                    $currentPlayer &&
                                    $currentPlayer != target
                                ) {
                                    $currentPlayer.pauseVideo();
                                }

                                $currentPlayer = target;
                            }
                            break;
                        case YT.PlayerState.ENDED:
                            {
                                dispatch("ended", target);

                                if ($currentPlayer == target) {
                                    $currentPlayer = null;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                },
            },
        });
    }

    new DOMParser();
</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

{#await metadata then { height, width }}
    <button on:click={() => load(height, width)} bind:this={el}>
        <img src={thumbnail} alt="Thumbnail" />
    </button>
{/await}

<style lang="scss">
    button {
        padding: 0;
        border: 0;

        img {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
        }
    }

    :global(iframe) {
        width: 100%;
        aspect-ratio: 16 / 9;
        height: auto;
    }
</style>
