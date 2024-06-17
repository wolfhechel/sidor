export interface User {
    id: number;
    username: string;
    is_admin: boolean;
    theme: string;
    language: string;
    timezone: string;
    entry_sorting_direction: string;
    entries_per_page: 100;
}

export interface Category {
    id: number;
    title: string;
    user_id: number;
}

export interface Feed {
    id: number;
    user_id: number;
    title: string;
    category: Category;
}

export interface Entry {
    id: number;
    user_id: number;
    feed_id: number;
    title: string;
    url: string;
    comments_url: string;
    author: string;
    content: string;
    published_at: string;
    created_at: string;
    status: string;
    feed: Feed;
}

export interface Pagination<T> {
    total: number;
    entries: T[]
}

export class Client {
    host: string | undefined;
    token: string | undefined;
    isAuthenticated: boolean;

    constructor (host?: string, token?: string) {
        if (host && token) {
            this.host = host;
            this.token = token;
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
        }
    }

    async get<T>(path: string, params?: { [key: string]: string | string[]} ): Promise<T> {
        if (!this.isAuthenticated) {
            return Promise.reject(new Error("client not authenticated"));
        }
        
        let query: string = '';

        if (params) {
            let urlsearch = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((value) => {
                        urlsearch.append(key, value);
                    })
                } else {
                    urlsearch.append(key, value);
                }
            })

            query = `?` + urlsearch;
        }

        return fetch(`${this.host}/v1/${path}` + query, {
            headers: {
                'X-Auth-Token': this.token!
            }
        }).then(
            (response) => response.json()
        ).then((data) => {
            if (Object.hasOwn(data, "error_message")) {
                throw Error(data.error_message);
            } else {
                return data;
            }
        })
    }
}