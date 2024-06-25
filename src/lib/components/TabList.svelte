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

<ul>
    {#each tabs as tab}
        {@const isCurrent = currentTab == tab.id}
        <li>
            <a
                href={isCurrent ? `#${tab.id}-0` : `#${tab.id}`}
                aria-current={isCurrent ? "page" : undefined}>{tab.title}</a
            >
        </li>
    {/each}
</ul>

<style lang="scss">
    @use "$lib/breakpoints";

    ul {
        margin: 0;
        padding: 0;
        display: inline-flex;
        flex: 1;

        li {
            list-style-type: none;
            flex: 1;

            a {
                color: var(--text-color);
                text-decoration: none;
                display: block;
                padding: 12px;
                white-space: nowrap;
                border-bottom: 2px solid transparent;
                letter-spacing: 0.25px;
                font-weight: 700;
                text-align: center;

                &:hover {
                    background-color: var(--button-hover-color);
                }

                &[aria-current] {
                    border-color: var(--primary-color);
                }
            }
        }
    }

    @media screen and (min-width: breakpoints.$desktop) {
        ul {
            flex-direction: column;
            gap: 10px;
            padding: 10px;
            min-width: 300px;

            li {
                flex: none;

                a {
                    text-align: left;
                    border-left: 2px solid transparent;
                    border-bottom: 0;
                }
            }
        }
    }
</style>
