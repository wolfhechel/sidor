<script lang="ts">
    export let selectedStatus: string;

    const options = [
        ["unread", "Unread"],
        ["read", "Read"],
        ["removed", "Deleted"],
    ];
</script>

<menu class="flex bg-depth-1">
    {#each options as [status, label]}
        <li class="flex-1">
            <label
                class="block whitespace-nowrap no-underline text-center p-2 border-b-2 border-transparent box-content hover:bg-hover has-[:checked]:border-accent"
            >
                <input
                    type="radio"
                    bind:group={selectedStatus}
                    value={status}
                    class="invisible appearance-none"
                />
                {label}
            </label>
        </li>
    {/each}
</menu>
