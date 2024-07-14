<script lang="ts">
    import { inview } from "svelte-inview";

    let animate: boolean = false;
</script>

<div
    use:inview
    on:inview_enter={() => (animate = true)}
    class="flex min-h-full items-center gap-2 justify-center p-4"
>
    <span class="text-sm font-bold">All caught up!</span>

    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
        class:animate
        class="block w-8"
    >
        <circle
            class="stroke-fg-secondary fill-none"
            stroke-width="12"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="59.1"
        />
        <polyline
            class="stroke-fg-secondary fill-none"
            stroke-width="12"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 27.8,67.5 "
        />
    </svg>
</div>

<style lang="scss">
    svg {
        circle {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
        }

        polyline {
            stroke-dasharray: 1000;
            stroke-dashoffset: -100;
        }

        &.animate {
            circle {
                animation: dash 0.9s ease-in-out;
            }

            polyline {
                animation: dash-check 0.9s 0.35s ease-in-out forwards;
            }
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

    @keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }
</style>
