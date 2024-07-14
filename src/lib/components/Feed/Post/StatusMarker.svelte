<script lang="ts">
    import { EntryStatus } from "$lib/api";

    export let status: EntryStatus = EntryStatus.Read;
    export let size: string = "24px";

    let timerHandle: string | number | NodeJS.Timeout | undefined;

    const disableContextMenu = (ev: Event) => {
        ev.preventDefault();
    };

    const down = (e: Event) => {
        e.preventDefault();
        window.addEventListener("contextmenu", disableContextMenu);

        timerHandle = setTimeout(() => {
            timerHandle = undefined;
            status =
                status == EntryStatus.Removed
                    ? EntryStatus.Read
                    : EntryStatus.Removed;
        }, 500);
    };

    const up = (e: Event) => {
        e.preventDefault();
        window.removeEventListener("contextmenu", disableContextMenu);

        if (timerHandle) {
            clearTimeout(timerHandle);
            status =
                status == EntryStatus.Read
                    ? EntryStatus.Unread
                    : EntryStatus.Read;
        }
    };
</script>

<div
    style:--size={size}
    role="button"
    tabindex="-1"
    class={status}
    on:mousedown={down}
    on:mouseup={up}
    on:touchstart={down}
    on:touchend={up}
>
    <svg viewBox="0 0 44 44">
        <path
            d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
            transform="translate(-2.000000, -2.000000)"
        ></path>
    </svg>
</div>

<style lang="scss">
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    div {
        justify-self: center;
        border: 2px solid var(--green-color);
        border-radius: 50%;
        position: relative;
        width: var(--size);
        height: var(--size);

        &:before {
            transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
            animation: bounceInBefore 0.3s linear forwards 0.3s;
        }

        &:after {
            transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
            animation: bounceInAfter 0.3s linear forwards 0.3s;
        }

        svg {
            fill: none;
            stroke-width: 3.6;
            stroke: var(--text-color);
            stroke-linecap: round;
            stroke-linejoin: round;
            width: var(--size);
            height: var(--size);
            display: block;
            position: absolute;
            left: -2px;
            top: -2px;
            right: -2px;
            bottom: -2px;
            z-index: 1;
            stroke-dashoffset: 124.6;
            stroke-dasharray: 0 162.6 133 29.6;
            transition: all 0.4s ease 0s;
        }
    }

    div.read {
        svg {
            stroke-dashoffset: 162.6;
            stroke-dasharray: 0 162.6 28 134.6;
            transition: all 0.4s ease 0.2s;
            stroke: var(--green-color);
        }

        &:before {
            animation: bounceInBeforeDont 0.3s linear forwards 0s;
        }

        &:after {
            animation: bounceInAfterDont 0.3s linear forwards 0s;
        }
    }

    div.removed {
        svg {
            stroke: var(--red-color);
        }
        &:after,
        &:before {
            content: "";
            width: 2px;
            height: 14px;
            background: var(--red-color);
            position: absolute;
            left: 50%;
            top: 50%;
            opacity: 0;
        }
    }

    @keyframes bounceInBefore {
        0% {
            opacity: 0;
            transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
        }
        50% {
            opacity: 0.9;
            transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
        }
        80% {
            opacity: 1;
            transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(45deg);
        }
    }

    @keyframes bounceInAfter {
        0% {
            opacity: 0;
            transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
        }
        50% {
            opacity: 0.9;
            transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
        }
        80% {
            opacity: 1;
            transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(-45deg);
        }
    }

    @keyframes bounceInBeforeDont {
        0% {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(45deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
        }
    }

    @keyframes bounceInAfterDont {
        0% {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(-45deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
        }
    }
</style>
