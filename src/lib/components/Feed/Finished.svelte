<script lang="ts">
    import { inview } from "svelte-inview";

    let animate: boolean = false;
</script>

<div use:inview on:inview_enter={() => (animate = true)}>
    <span>All caught up!</span>

    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
        class:animate
    >
        <circle
            class="path circle"
            fill="none"
            stroke-width="12"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="59.1"
        />
        <polyline
            class="path check"
            fill="none"
            stroke-width="12"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 27.8,67.5 "
        />
    </svg>
</div>

<style lang="scss">
    div {
        display: flex;
        min-height: 100%;
        align-items: center;
        gap: 8px;
        justify-content: center;
        padding: 16px;
        --color: var(--secondary-text-color);
    }

    svg {
        width: 32px;
        display: block;
    }

    .path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;
        stroke: var(--color);

        &.check {
            stroke-dashoffset: -100;
        }
    }

    svg.animate .path {
        &.circle {
            -webkit-animation: dash 0.9s ease-in-out;
            animation: dash 0.9s ease-in-out;
        }

        &.check {
            -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
            animation: dash-check 0.9s 0.35s ease-in-out forwards;
        }
    }

    span {
        color: var(--color);
        font-weight: bold;
        font-size: 1.1875rem;
        line-height: 1.375rem;
    }

    @-webkit-keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }

    @-webkit-keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }

    @keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }
</style>
