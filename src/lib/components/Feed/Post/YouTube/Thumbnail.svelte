<script lang="ts">
    export let videoId: string;
    export let alt: string = "Thumbnail for YouTube video";
</script>

<img
    class="w-full aspect-video object-cover"
    srcset="https://i4.ytimg.com/vi/{videoId}/default.jpg 120w, 
          https://i4.ytimg.com/vi/{videoId}/mqdefault.jpg 320w,
          https://i4.ytimg.com/vi/{videoId}/hqdefault.jpg 420w,
          https://i4.ytimg.com/vi/{videoId}/sddefault.jpg 640w,
          https://i4.ytimg.com/vi/{videoId}/maxresdefault.jpg 1280w"
    sizes="(max-width: 220px) 120px,
         (max-width: 370px) 320px,
         (max-width: 560px) 420px,
         (max-width: 960px) 640px,
         1280px"
    src="https://i4.ytimg.com/vi/{videoId}/maxresdefault.jpg"
    {alt}
/>
