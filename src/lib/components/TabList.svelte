<script lang="ts" context="module">
    export interface Tab {
        title: string;
        id: number;
    }
</script>

<script lang="ts">
    export let tabs: Tab[];
    export let currentTab: number;
</script>

<menu>
    {#each tabs as tab}
        {@const isCurrent = currentTab == tab.id}
        <li>
            <a
                href={isCurrent ? `#${tab.id}_` : `#${tab.id}`}
                aria-current={isCurrent ? "page" : undefined}
            >
                <span>{tab.title}</span></a
            >
        </li>
    {/each}
</menu>

<style lang="scss">
    menu {
        margin: 0;
        padding: 0;
        display: inline-flex;
        flex: 1;

        li {
            list-style-type: none;
            flex: 1;
            display: flex;

            a {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                color: var(--text-color);
                text-decoration: none;
                font-weight: 700;
                text-align: center;
                letter-spacing: 0.25px;
                border-bottom: 2px solid transparent;
                padding: 0 15px;

                &:hover {
                    background-color: var(--button-hover-color);
                }

                &[aria-current] {
                    border-color: var(--primary-color);
                }
            }
        }
    }

    @media (orientation: landscape) {
        menu {
            flex-direction: column;

            li {
                flex: none;

                a {
                    padding: 10px;
                    justify-content: flex-start;
                    border-left: 2px solid transparent;
                    border-bottom: 0;
                }
            }
        }
    }
</style>
