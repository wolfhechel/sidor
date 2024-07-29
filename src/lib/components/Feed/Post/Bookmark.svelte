<script lang="ts" context="module">
    let counter = 1;
</script>

<script lang="ts">
    export let checked: boolean;
    import Icon from "@iconify/svelte";

    const id = counter++;
</script>

<input
    class="hidden peer"
    type="checkbox"
    id="bookmark-{id}"
    bind:checked
    on:change
/>
<label for="bookmark-{id}">
    <Icon
        icon={checked ? "mdi-bookmark" : "mdi-bookmark-outline"}
        width="1.5em"
        height="1.5em"
    />
</label>
