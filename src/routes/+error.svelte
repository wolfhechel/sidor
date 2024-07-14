<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    $: $page.status == 404 && goto("/");
</script>

<div class="full max-w-md m-auto flex items-center justify-center flex-col">
    <h1 class="text-xl text-slate-800">{$page.status}</h1>
    <p class="text-slate-600">{$page.error?.message}</p>
</div>
