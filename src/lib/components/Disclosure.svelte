<script lang="ts">
    export let summary: string;
</script>

<details>
    <summary>{summary}</summary>
    <slot />
</details>
