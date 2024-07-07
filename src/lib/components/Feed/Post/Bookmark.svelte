<script lang="ts" context="module">
    let counter = 1;
</script>

<script lang="ts">
    export let checked: boolean;

    const id = counter++;
</script>

<input type="checkbox" id="bookmark-{id}" bind:checked on:change />
<label for="bookmark-{id}">
    <span></span>
</label>

<style lang="scss">
    input[type="checkbox"] {
        display: none;
    }

    label {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 300;
        color: var(--text-color);
    }

    span::before {
        visibility: visible;
        content: "\2606";
        display: block;
        cursor: pointer;
    }

    input[type="checkbox"]:checked + label span::before {
        content: "\2605";
    }
</style>
