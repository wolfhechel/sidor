<script lang="ts">
    export let html: string;
</script>

<div>
    {@html html}
</div>

<style lang="scss">
    div {
        font-size: 1rem;
        line-height: 1.375rem;
        max-width: 70ch;
        word-break: break-word;
        margin-top: 1.375rem;

        :global(table) {
            border-spacing: 0;
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
            font-size: 0.8125rem;
            line-height: 1.375rem;
        }

        :global(h1) {
            font-size: 1.75rem;
            line-height: 2.75rem;
            margin-top: 1.375rem;
            margin-bottom: 2.75rem;
        }

        :global(h2) {
            font-size: 1.4375rem;
            line-height: 2.75rem;
            margin-top: 1.375rem;
            margin-bottom: 1.375rem;
        }

        :global(h3) {
            font-size: 1.1875rem;
            line-height: 1.375rem;
            margin-top: 1.375rem;
            margin-bottom: 0rem;
        }

        :global(h4) {
            font-size: 1rem;
            line-height: 1.375rem;
            margin-top: 1.375rem;
            margin-bottom: 0rem;
        }

        :global(h5) {
            font-size: 1rem;
            line-height: 1.375rem;
            margin-top: 1.375rem;
            margin-bottom: 0rem;
        }

        :global(p),
        :global(ul),
        :global(ol),
        :global(pre),
        :global(table),
        :global(blockquote) {
            margin-top: 0rem;
            margin-bottom: 1.375rem;
        }

        :global(ul ol),
        :global(ul ul),
        :global(ol ol),
        :global(ol ul) {
            margin-top: 0rem;
            margin-bottom: 0rem;
        }

        :global(hr) {
            border: 1px solid;
            margin: -1px 0;
        }

        :global(a),
        :global(b),
        :global(i),
        :global(strong),
        :global(em),
        :global(small),
        :global(code) {
            line-height: 0;
        }

        :global(sub),
        :global(sup) {
            line-height: 0;
            position: relative;
            vertical-align: baseline;
        }

        :global(sup) {
            top: -0.5em;
        }

        :global(sub) {
            bottom: -0.25em;
        }
    }
</style>
