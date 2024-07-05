<script lang="ts" context="module">
    /// <reference path="YT.d.ts" />

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
    import { createEventDispatcher } from "svelte";
    import Thumbnail from "./Thumbnail.svelte";

    export let url: string;

    let videoId: string = parseYouTubeId(url);
    let player: YT.Player;
    let el: HTMLElement;

    const dispatch = createEventDispatcher();

    const loadMetadata = async (
        videoId: string,
    ): Promise<{
        title: string;
        author_name: string;
        author_url: string;
        height: number;
        width: number;
        thumbnail_height: number;
        thumbnail_width: number;
        thumbnail_url: string;
        html: string;
    }> => {
        return fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        ).then((response) => response.json());
    };

    const loadVideoPlayer = (
        height: number,
        width: number,
        videoId: string,
    ) => {
        player = new YT.Player(el, {
            height,
            width,
            host: "https://www.youtube-nocookie.com",
            videoId,
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
    };

    const load = () => {
        loadMetadata(videoId).then(({ height, width }) => {
            loadVideoPlayer(height, width, videoId);
        });
    };
</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<button on:click={() => load()} bind:this={el}><Thumbnail {videoId} /></button>

<style lang="scss">
    button {
        padding: 0;
        border: 0;
        cursor: pointer;
        line-height: 0;
    }

    :global(iframe) {
        width: 100%;
        aspect-ratio: 16 / 9;
        height: auto;
    }
</style>
