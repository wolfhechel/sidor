<div id="wrapper" class="no-scrollbar">
    <main>
        <slot name="main"></slot>
    </main>

    <div id="navigation">
        <nav class="no-scrollbar">
            <slot name="nav" />
        </nav>
        <aside>
            <input type="checkbox" id={`toggle-context`} />
            <label for={`toggle-context`}>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </label>
            <div>
                <slot name="aside" />
            </div>
        </aside>
    </div>
</div>

<style lang="scss">
    div#wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    div#navigation {
        border-top: 1px solid var(--border-color);
        display: flex;
        z-index: 2;
        container: navigation-bar / size;
        height: 48px;
    }

    main {
        overflow: hidden;
        flex: 3;
    }

    nav {
        flex: 1;
        display: flex;
        overflow-x: scroll;
    }

    aside {
        height: 100%;
        aspect-ratio: 1 / 1;

        & > input {
            display: none;
        }

        & > div {
            display: none;
        }

        label {
            display: flex;
            height: 100%;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 8px;
                padding: 8px;

                span {
                    border-top: 1px solid var(--text-color);
                    border-bottom: 1px solid var(--text-color);
                    width: 32px;

                    transform-origin: left center;
                    transform: rotate(0deg);
                    transition: 0.2s ease-in-out;
                }
            }
        }

        input[type="checkbox"]:checked ~ {
            & label {
                background-color: var(--button-hover-color);

                div > span {
                    &:nth-child(1) {
                        transform: translate(6px, 0) rotate(45deg);
                    }

                    &:nth-child(2) {
                        width: 0%;
                        opacity: 0;
                    }

                    &:nth-child(3) {
                        transform: translate(6px, 2px) rotate(-45deg);
                    }
                }
            }
        }
    }

    @container navigation-bar (orientation: landscape) {
        input[type="checkbox"]:checked ~ div {
            display: block;
            position: absolute;
            bottom: 100%;
            left: 0;
            width: 100%;
        }
    }

    @media (orientation: landscape) {
        div#wrapper {
            flex-direction: row;
            width: 100%;
            max-width: unset;
            gap: 8px;
        }

        div#navigation {
            display: contents;
        }

        main {
            width: 100%;
            order: 1;
        }

        nav,
        aside {
            padding-top: 64px;
        }

        nav {
            width: auto;
            order: 2;
        }

        aside {
            display: flex;
            justify-content: end;
            order: 0;
            flex: 1;
            width: auto;
        }

        aside div {
            display: initial;
        }

        aside label {
            display: none;
        }
    }
</style>
