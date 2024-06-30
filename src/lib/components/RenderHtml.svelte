<script lang="ts">
    export let html: string;
</script>

<div>
    {@html html}
</div>

<style lang="scss">
    div {
        :global(table) {
            border-spacing: 0;
        }

        :global(h1) {
            line-height: 1.25;
        }

        :global(h3) {
            line-height: 1.3;
        }

        :global(iframe) {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
        }

        :global(img) {
            max-width: 100%;
            border-radius: 10px;
        }

        :global(video) {
            max-width: 100%;
        }

        :global(figure) {
            margin-block: 20px;
            margin-inline: 0;
        }

        :global(figcaption) {
            text-align: center;
            font-size: 0.8rem;
        }
    }
</style>