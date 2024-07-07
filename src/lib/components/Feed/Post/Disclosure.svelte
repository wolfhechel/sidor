<script lang="ts">
    export let summary: string;
</script>

<details>
    <summary>{summary}</summary>
    <slot />
</details>

<style lang="scss">
    details {
        margin-block-start: 1em;
        margin-block-end: 1em;
    }
    summary {
        cursor: pointer;
    }
</style>
