<script lang="ts">
    import type { ComponentType } from "svelte";

    let checked = false;
    let selectedOption: Option | undefined;

    interface Option {
        label: string;
        component: ComponentType;
    }

    let options: Option[] = [];

    const onClick = (index: number) => {
        let option: Option = options[index];

        selectedOption = option;
        checked = false;
    };
</script>

<div>
    <input bind:checked type="checkbox" id="toggle-settings-page" />
    <label id="settings-container" for="toggle-settings-page">
        <span></span>
        <span></span>
        <span></span>
    </label>
    <ul>
        {#each options as option, i}
            <li>
                <button on:click={() => onClick(i)}>{option.label}</button>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    @use "$lib/breakpoints";

    div {
        border-left: 1px solid var(--border-color);
        height: 100%;

        input,
        ul {
            display: none;
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

        ul {
            margin: 0;
            padding: 0;

            li {
                list-style-type: none;
                border-bottom: 1px solid var(--border-color);

                button {
                    border: 0;
                    background-color: var(--background-color);
                    cursor: pointer;
                    height: 100%;
                    width: 100%;
                    padding: 10px;
                    text-align: right;
                    font-weight: bold;

                    &:hover,
                    &:active {
                        background-color: var(--button-hover-color);
                    }
                }
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

        input[type="checkbox"]:checked ~ ul {
            display: block;
            position: absolute;
            right: 0;
            top: 47px;
            background-color: var(--background-color);
            width: 100%;
        }
    }

    @media screen and (min-width: breakpoints.$desktop) {
        div {
            display: flex;
            justify-content: end;

            ul {
                display: inline-flex;
                flex-direction: column;
                min-width: 300px;
                gap: 10px;
                padding: 10px;

                li {
                    border-bottom: 0;
                }
            }

            label {
                display: none;
            }
        }
    }
</style>
