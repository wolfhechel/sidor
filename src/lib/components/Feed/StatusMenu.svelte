<script lang="ts">
    export let selectedStatus: string;

    const options = [
        ["unread", "Unread"],
        ["read", "Read"],
        ["removed", "Deleted"],
    ];
</script>

<menu>
    {#each options as [status, label]}
        <li>
            <label>
                <input
                    type="radio"
                    bind:group={selectedStatus}
                    value={status}
                />
                {label}
            </label>
        </li>
    {/each}
</menu>

<style lang="scss">
    menu {
        padding: 0;
        margin: 0;
        display: flex;
        background-color: var(--depth-1-color);

        li {
            list-style-type: none;
            flex: 1;

            label {
                display: block;
                white-space: nowrap;
                color: var(--text-color);
                text-decoration: none;
                text-align: center;
                letter-spacing: 0.25px;
                padding: 8px 16px;
                border-bottom: 2px solid transparent;
                padding-bottom: 6px;

                &:hover {
                    background-color: var(--button-hover-color);
                }

                &:has(input:checked) {
                    border-color: var(--primary-color);
                }

                input {
                    visibility: hidden;
                    appearance: none;
                }
            }
        }
    }
</style>
