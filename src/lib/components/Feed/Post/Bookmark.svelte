<script lang="ts" context="module">
    let counter = 1;
</script>

<script lang="ts">
    export let checked: boolean;

    const id = counter++;
</script>

<input
    class="hidden peer"
    type="checkbox"
    id="bookmark-{id}"
    bind:checked
    on:change
/>
<label
    class="text-[1.5rem] leading-[2rem] font-light before:visible before:block before:cursor-pointer before:content-['\2606'] peer-checked:before:content-['\2605']"
    for="bookmark-{id}"
>
</label>
