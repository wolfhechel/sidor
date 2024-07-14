<script lang="ts">
    import { goto } from "$app/navigation";
    import { Client, type User } from "$lib/api";
    import { profile, type Profile } from "$lib/store";

    let host: string;
    let token: string;

    $: error = "";

    const connect = () => {
        let api = new Client(host, token);

        api.get<User>("me")
            .then((user): Profile => {
                return {
                    host,
                    token,
                    user,
                };
            })
            .then(profile.set)
            .then(() => {
                goto("/");
            })
            .catch(({ message }) => {
                error = message;
            });
    };
</script>

<svelte:head>
    <title>Connect to Miniflux</title>
</svelte:head>

<main class="w-full max-w-sm m-auto">
    <form
        class="bg-white shadow-md rounded px-7 pt-6 pb-8 mb-2 mt-16"
        on:submit={() => connect()}
    >
        <h2 class="text-base font-semibold leading-7">Connect to Miniflux</h2>
        <p class="mt-1 mb-6 text-sm leading-6 text-fg-secondary">
            Enter host address and API token to connect.
        </p>

        {#if error}
            <p
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 capitalize"
                role="alert"
            >
                <span class="font-semibold">Failed to connect!</span>
                {error}
            </p>
        {/if}
        <div class="mb-4">
            <label
                class="block text-sm text-fg-secondary font-bold mb-2"
                for="host">Host</label
            >
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight ring-inset focus:outline-none focus:ring-2"
                bind:value={host}
                required
                type="url"
                id="host"
            />
        </div>

        <div class="mb-4">
            <label
                class="block text-sm text-fg-secondary font-bold mb-2"
                for="token">Token</label
            >
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight ring-inset focus:outline-none focus:ring-2"
                bind:value={token}
                required
                type="text"
                id="token"
            />
        </div>

        <button
            class="bg-accent opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
            type="submit">Connect</button
        >
    </form>
</main>
