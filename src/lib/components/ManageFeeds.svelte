<script lang="ts">
    import { channels, type Channel } from "$lib/data";
    import slugify from "slugify";

    let channelLabel: string;
    let feedUrl: string;

    const addChannel = () => {
        let channel: Channel = {
            id: slugify(channelLabel),
            label: channelLabel,
            feeds: [],
        };

        $channels.push(channel);
        $channels = $channels;
        channelLabel = "";
    };

    const deleteChannel = (channelIndex: number) => {
        $channels.splice(channelIndex, 1);
        $channels = $channels;
    };

    const addFeed = (channel: Channel) => {
        channel.feeds.push({
            url: feedUrl,
        });

        $channels = $channels;
    };

    const deleteFeed = (channel: Channel, feedIndex: number) => {
        channel.feeds.splice(feedIndex, 1);
        $channels = $channels;
    };
</script>

<ul>
    <li>
        <form on:submit={addChannel}>
            <span>
                <input
                    type="text"
                    maxlength="25"
                    required
                    placeholder="Channel name"
                    bind:value={channelLabel}
                /><button class="add" type="submit">+</button>
            </span>
        </form>
    </li>
    {#each $channels as channel, channelIndex}
        <li>
            <span>
                <strong>{channel.label}</strong>
                <button
                    class="remove"
                    on:click={() => deleteChannel(channelIndex)}>-</button
                >
            </span>
            <ul>
                {#each channel.feeds as feed, feedIndex}
                    <li>
                        <span>
                            <strong>{feed.url}</strong>
                            <button
                                class="remove"
                                on:click={() => deleteFeed(channel, feedIndex)}
                                >-</button
                            >
                        </span>
                    </li>
                {/each}
                <li>
                    <form on:submit={() => addFeed(channel)}>
                        <span>
                            <input
                                type="url"
                                required
                                placeholder="URL"
                                bind:value={feedUrl}
                            /><button class="add" type="submit">+</button>
                        </span>
                    </form>
                </li>
            </ul>
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        padding-top: 10px;

        li {
            list-style-type: none;
            padding-bottom: 10px;
            width: 100%;

            span {
                display: flex;
                justify-content: space-between;
            }

            input {
                border: 0;
                padding: 0;
                border-radius: 0;
                border-bottom: 1px solid var(--border-color);
                flex: 1;
            }

            button {
                border: 1px solid var(--border-color);
                height: 25px;
                width: 25px;
                background-color: transparent;
                font-weight: bold;
                line-height: 1;
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
                margin-left: 10px;

                &.add {
                    background-color: #96e594;
                }

                &.remove {
                    background-color: #fd6b6b;
                }
            }
        }
    }
</style>
