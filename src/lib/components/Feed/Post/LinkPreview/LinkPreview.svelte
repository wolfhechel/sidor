<script lang="ts" context="module">
    import { persisted } from "svelte-persisted-store";

    interface LinkPreview {
        title: string;
        description?: string;
        image?: string;
    }

    const cache = persisted<{ [key: string]: LinkPreview | undefined }>(
        "link-previews",
        {},
    );

    const metadata_map = {
        description: ["description", "twitter:description", "og:description"],
        title: ["og:title", "twitter:title"],
        image: ["og:image", "twitter:image"],
    };

    const firstKey = (
        obj: Record<string, string>,
        keys: string[],
    ): string | undefined => {
        let key = keys.find((key) => Object.hasOwn(obj, key));

        return key ? obj[key] : undefined;
    };

    const getMetadata = async (url: string): Promise<LinkPreview | null> => {
        return fetch(`https://api.allorigins.win/raw?url=${url}`)
            .then((response) => response.text())
            .then((content) => {
                const parser = new DOMParser();

                let doc = parser.parseFromString(content, "text/html");

                let meta = Object.fromEntries(
                    Array.from(doc.querySelectorAll("meta")).map((el) => {
                        return [
                            el.getAttribute("name") ||
                                el.getAttribute("property"),
                            el.content,
                        ];
                    }),
                );

                let title =
                    firstKey(meta, metadata_map.title) ||
                    doc.querySelector("title")?.textContent ||
                    url;
                let description = firstKey(meta, metadata_map.description);
                let image = firstKey(meta, metadata_map.image);

                return {
                    title,
                    description,
                    image,
                };
            });
    };

    const getAbsoluteAssetUrl = (baseUrl: string, assetUrl: string): string => {
        let absoluteUrl: URL;

        try {
            // Asset might be absolute
            absoluteUrl = new URL(assetUrl);
        } catch (error) {
            absoluteUrl = new URL(assetUrl, new URL(baseUrl));
        }

        return absoluteUrl.href;
    };
</script>

<script lang="ts">
    import domain from "$lib/utils/domain";
    import LinkPreviewSkeleton from "./LinkPreviewSkeleton.svelte";

    export let url: string;

    const mockPreview = (url: string): LinkPreview => {
        return {
            title: url,
        };
    };

    const load = async (url: string): Promise<LinkPreview> => {
        let response = $cache[url];

        if (!response) {
            return getMetadata(url).then((data) => {
                if (!data) {
                    data = mockPreview(url);
                }

                $cache[url] = data;
                $cache = $cache;

                return data;
            });
        } else {
            return Promise.resolve(response);
        }
    };

    $: imageError = false;
    $: imageLoaded = false;
</script>

<aside
    class="shadow overflow-hidden border flex flex-col justify-center items-center my-4"
>
    <div class="flex flex-col md:flex-row w-full">
        {#await load(url)}
            <LinkPreviewSkeleton hasImage={true}>
                <div class="bg-slate-200 animate-pulse" slot="image" />
                <div class="rounded bg-slate-200 w-40" slot="site">&nbsp;</div>
                <div class="rounded bg-slate-200" slot="title">&nbsp;</div>
                <div class="rounded bg-slate-200 h-14" slot="description">
                    &nbsp;
                </div>
            </LinkPreviewSkeleton>
        {:then response}
            <!-- svelte-ignore a11y-missing-attribute -->
            <LinkPreviewSkeleton
                hasImage={response.image !== undefined && !imageError}
            >
                <svelte:fragment slot="image">
                    {#if response.image}
                        <img
                            class="full object-cover object-center bg-slate-200"
                            src={getAbsoluteAssetUrl(url, response.image) +
                                "dsada"}
                            on:error={() => (imageError = true)}
                            on:load={() => (imageLoaded = true)}
                        />
                    {/if}
                </svelte:fragment>
                <svelte:fragment slot="site">{domain(url)}</svelte:fragment>
                <a
                    class="underline line-clamp-1"
                    href={url}
                    target="_blank"
                    slot="title">{response.title}</a
                >
                <svelte:fragment slot="description"
                    >{response.description}</svelte:fragment
                >
            </LinkPreviewSkeleton>
        {:catch error}
            <LinkPreviewSkeleton>
                <svelte:fragment slot="site">{domain(url)}</svelte:fragment>
                <a
                    class="underline line-clamp-1"
                    href={url}
                    target="_blank"
                    slot="title">{url}</a
                >
                <svelte:fragment slot="description">
                    Failed to load link preview<br />
                    {error}</svelte:fragment
                >
            </LinkPreviewSkeleton>
        {/await}
    </div>
</aside>
