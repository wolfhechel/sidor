<script lang="ts">
    export let label: string;
</script>

<time>{label}</time>

<style lang="scss">
    time {
        padding: 8px 16px;
        font-weight: bold;
        font-size: 0.8125rem;
        line-height: 1.375rem;
        color: var(--secondary-text-color);
    }
</style>
