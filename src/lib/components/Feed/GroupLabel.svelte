<script lang="ts">
    export let label: string;
</script>

<time>{label}</time>

<style lang="scss">
    time {
        padding: 10px 15px;
        font-weight: bold;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
    }
</style>
