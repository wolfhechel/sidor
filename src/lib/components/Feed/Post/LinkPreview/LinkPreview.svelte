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
    import Spinner from "./Spinner.svelte";
    import { domain } from "$lib/utils";

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
</script>

<aside
    class="shadow overflow-hidden border flex flex-col justify-center items-center my-4"
>
    {#await load(url)}
        <div class="flex flex-col p-4 gap-1">
            <Spinner />
        </div>
    {:then response}
        {@const urlDomain = domain(url)}
        <a
            class="flex flex-col md:flex-row no-underline w-full"
            href={url}
            target="_blank"
        >
            {#if response.image}
                <img
                    class="w-full h-[250px] md:h-[150px] md:w-auto md:aspect-square object-cover object-center"
                    src={getAbsoluteAssetUrl(url, response.image)}
                    alt={`Shared image from ${url}`}
                />
            {/if}
            <div class="flex flex-col p-4 gap-1">
                <span class="text-light-foreground-secondary text-xs"
                    >{urlDomain}</span
                >
                <span>{response.title}</span>
                {#if response.description}
                    <span class="text-light-foreground-secondary line-clamp-3"
                        >{response.description}</span
                    >
                {/if}
            </div>
        </a>
    {:catch error}
        <div class="flex flex-col p-4 gap-1">
            <span>Failed to load link preview</span>
            <span class="text-light-foreground-secondary">{error}</span>
        </div>
    {/await}
</aside>
