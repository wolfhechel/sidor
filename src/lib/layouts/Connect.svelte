<script lang="ts">
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
                    host: host,
                    token: token,
                };
            })
            .then(profile.set)
            .catch(({ message }) => {
                error = message;
            });
    };
</script>

<main>
    <section>
        <p>
            {#if error}
                <span class="error">Error: {error}</span>
            {:else}
                <strong>Enter host address and api token to connect</strong>
            {/if}
        </p>

        <form on:submit={() => connect()}>
            <label for="host">
                Host:
                <input bind:value={host} required type="url" id="host" />
            </label>

            <label for="token">
                Token:
                <input bind:value={token} required type="text" id="token" />
            </label>

            <button type="submit">Connect</button>
        </form>
    </section>
</main>

<style lang="scss">
    main {
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
    }

    section {
        align-self: center;
        width: 400px;
    }

    span.error {
        display: block;
        padding: 10px;
        background-color: var(--error-color);
        font-weight: bold;
        color: var(--nord6);
        text-transform: capitalize;
    }

    label {
        font-weight: bold;
        display: block;
        margin-bottom: 16px;
        font-size: 0.9rem;

        input {
            display: block;
            box-sizing: border-box;
            width: 100%;
        }
    }

    button {
        margin-top: 16px;
        width: 100%;
    }
</style>
