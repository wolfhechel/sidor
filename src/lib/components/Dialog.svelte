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
        <button formmethod="dialog">&#x2715;</button>
    </form>
    <section>
        <slot />
    </section>
</dialog>

<style lang="scss">
    :global(body:has(dialog[open])) {
        overflow: hidden;
    }

    dialog {
        max-width: 500px;
        width: 80vw;
        height: fit-content;
        max-height: 80vh;
        box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.5);
        border: none;
        padding: 0;

        form {
            display: flex;
            justify-content: space-between;
            padding: 1em;
            background-color: #eceff4;
            color: #2e3440;

            h3 {
                margin: 0;
            }

            button {
                background-color: transparent;
                border-radius: 0;
                border: none;
                background-color: #d8dee9;
                padding: 2px 6px;
                border-radius: 2px;
                cursor: pointer;
            }
        }

        section {
            padding: 10px 16px;
        }
    }
</style>
