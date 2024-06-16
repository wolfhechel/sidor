<script lang="ts">
    import Settings from "./Settings.svelte";
    import CategoryTabList from "./CategoryTabList.svelte";
</script>

<header>
    <nav>
        <CategoryTabList />
    </nav>

    <aside>
        <Settings />
    </aside>
</header>

<style lang="scss">
    @use "$lib/breakpoints";

    header {
        position: sticky;
        top: 0;
        background-color: white;
        height: 45px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        gap: 5px;

        nav {
            display: flex;
            overflow-x: scroll;
            flex: 1;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        aside {
            width: 42px;
        }

        @media screen and (min-width: breakpoints.$desktop) {
            display: contents;

            nav {
                order: 2;
            }

            aside {
                order: 0;
            }

            nav,
            aside {
                width: auto;
                flex: 1;
                padding-top: 60px;
            }
        }
    }
</style>
