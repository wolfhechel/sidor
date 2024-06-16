<script lang="ts">
    import { currentCategory, categories } from "$lib/store";
</script>

<ul>
    {#each $categories as category}
        <li>
            <a
                href={`#${category.id}`}
                aria-current={$currentCategory?.id == category.id
                    ? "page"
                    : undefined}>{category.title}</a
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
                color: black;
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
