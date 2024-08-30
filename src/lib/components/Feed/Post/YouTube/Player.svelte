<script lang="ts" context="module">
    /// <reference path="YT.d.ts" />

    const YOUTUBE_HOST = 'https://www.youtube-nocookie.com'
    const MEDIA_PROGRESSION_UPDATE_INTERVAL = 5;

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
    export let seek: number = 0;

    let videoId: string = parseYouTubeId(url);
    let player: YT.Player;
    let el: HTMLElement;
    let updateProgressInterval: string | number | NodeJS.Timeout | undefined;

    const dispatch = createEventDispatcher();

    const updateMediaProgression = (player: YT.Player) => {
        dispatch("progress", {
            currentTime: player.getCurrentTime(),
            duration: player.getDuration()
        });
    }

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
            `${YOUTUBE_HOST}/oembed?url=${YOUTUBE_HOST}/watch?v=${videoId}&format=json`,
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
            host: `${YOUTUBE_HOST}`,
            videoId,
            events: {
                onReady: (event) => {
                    if (seek > 0) {
                        event.target.seekTo(seek, true);
                    }

                    event.target.playVideo();
                },
                onStateChange: ({ data, target }) => {
                    switch (data) {
                        case YT.PlayerState.PLAYING:
                            {
                                if (
                                    $currentPlayer &&
                                    $currentPlayer != target
                                ) {
                                    $currentPlayer.pauseVideo();
                                }

                                updateProgressInterval = setInterval(() => {
                                    updateMediaProgression(target);
                                }, 1000 * MEDIA_PROGRESSION_UPDATE_INTERVAL);

                                $currentPlayer = target;
                            }
                            break;
                        case YT.PlayerState.ENDED:
                            {
                                if ($currentPlayer == target) {
                                    $currentPlayer = null;
                                }
                            }
                            break;
                        case YT.PlayerState.PAUSED:
                            clearInterval(updateProgressInterval);
                            updateMediaProgression(target);
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

<button
    class="leading-none cursor-pointer w-full aspect-video h-auto"
    on:click={() => load()}
    bind:this={el}><Thumbnail {videoId} /></button
>
