<script lang="ts">
    import domain from "$lib/utils/domain";

    export let url: string;
    export let size: string | number = 128;

    $: src = `https://www.google.com/s2/favicons?domain=${domain(url)}&sz=${size}`;
</script>

<img alt={`${domain(url)} favicon`} {src} />
