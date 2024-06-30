<script lang="ts">
    let checked = false;
</script>

<aside>
    <input bind:checked type="checkbox" id="toggle-settings-page" />
    <label id="settings-container" for="toggle-settings-page">
        <span></span>
        <span></span>
        <span></span>
    </label>
    <div><slot /></div>
</aside>

<style lang="scss">
    @use "$lib/breakpoints";

    aside {
        border-left: 1px solid var(--border-color);
        height: 100%;

        input,
        div {
            display: none;
        }

        div {
            background-color: var(--background-color);
        }

        label {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 5px;
            padding: 0 10px;

            span {
                border-top: 1px solid var(--text-color);
                border-bottom: 1px solid var(--text-color);
                width: 20px;

                transform-origin: left center;
                transform: rotate(0deg);
                transition: 0.2s ease-in-out;
            }
        }

        input[type="checkbox"]:checked ~ label {
            background-color: var(--button-hover-color);

            span {
                &:nth-child(1) {
                    transform: translate(3px, 0) rotate(45deg);
                }

                &:nth-child(2) {
                    width: 0%;
                    opacity: 0;
                }

                &:nth-child(3) {
                    transform: translate(3px, 0) rotate(-45deg);
                }
            }
        }

        input[type="checkbox"]:checked ~ div {
            display: block;
            position: absolute;
            right: 0;
            bottom: 47px;
            background-color: var(--background-color);
            width: 100%;
        }
    }

    @media screen and (min-width: breakpoints.$desktop) {
        aside {
            display: flex;
            justify-content: end;

            label {
                display: none;
            }
        }
    }
</style>
