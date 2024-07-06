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