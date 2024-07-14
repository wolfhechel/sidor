<script lang="ts">
    export let summary: string;
</script>

<details class="my-4">
    <summary class="cursor-pointer">{summary}</summary>
    <slot />
</details>
