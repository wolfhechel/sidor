<script lang="ts">
    export let avatar: string | null;
    export let alt: string;

    const short = (str) => {
        return "JD";
    };
</script>

<figure>
    {#if avatar}
        <img src={avatar} {alt} />
    {:else}
        <span>{short(alt)}</span>
    {/if}
</figure>

<style lang="scss">
    figure {
        margin: 0;
        padding: 0;
        width: 52px;
        height: 52px;
        display: flex;
        background-color: var(--button-hover-color);
        border-radius: 26px;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        span {
            text-align: center;
            font-weight: 700;
        }
    }
</style>
