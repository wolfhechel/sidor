import { derived } from "svelte/store";
import { createQuery } from "@tanstack/svelte-query";
import { client } from "./store";
import { type Category } from "./api";


export const categoriesQuery = () => createQuery(
    derived(client, ($client) => ({
        queryKey: ["categories"],
        queryFn: async () => $client.get<Category[]>("categories"),
    }))
);