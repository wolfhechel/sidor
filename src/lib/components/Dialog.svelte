<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let label: string;

    const dispatch = createEventDispatcher();

    const showModal = (el: HTMLDialogElement) => {
        el.showModal();

        el.addEventListener("close", () => dispatch("close"));
    };
</script>

<dialog use:showModal>
    <form>
        <h3>{label}</h3>
        <button formmethod="dialog">Close</button>
    </form>
    <slot />
</dialog>

<style lang="scss">
    :global(body:has(dialog[open])) {
        overflow: hidden;
    }

    dialog {
        max-width: 500px;
        width: 80vw;
        height: 80vh;

        form {
            display: flex;
            justify-content: space-between;
            padding: 1em 0;

            h3 {
                margin: 0;
            }

            button {
                background-color: transparent;
                border-radius: 0;
                border: 1px solid var(--text-color);
            }
        }
    }
</style>
