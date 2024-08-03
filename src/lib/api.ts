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
    hide_globally: boolean;
}

export interface Enclosure {
    id: number;
    user_id: number;
    entry_id: number;
    url: string;
    mime_type: string;
    size: number;
    media_progression: number;
}

export interface Icon {
    feed_id: number;
    icon_id: number;
}

export interface Feed {
    id: number;
    user_id: number;
    title: string;
    checked_at: string;
    next_check_at: string;
    etag_header: string;
    last_modified_header: string;
    parsing_error_message: string;
    parsing_error_count: number;
    scraper_rules: string;
    rewrite_rules: string;
    crawler: boolean;
    blocklist_rules: string;
    keeplist_rules: string;
    urlrewrite_rules: string;
    user_agent: string;
    cookie: string;
    username: string;
    password: string;
    disabled: boolean;
    no_media_player: boolean;
    ignore_http_cache: boolean;
    allow_self_signed_certificates: boolean;
    fetch_via_proxy: boolean;
    hide_globally: boolean;
    apprise_service_urls: string;
    disable_http2: boolean;
    category: Category;
    feed_url: string;
    site_url: string;
    icon: Icon;
}

export interface Entry {
    id: number;
    user_id: number;
    feed_id: number;
    status: 'read' | 'unread' | 'removed';
    hash: string;
    title: string;
    url: string;
    comments_url: string;
    published_at: string;
    created_at: string;
    changed_at: string;
    content: string;
    author: string;
    share_code: string;
    starred: boolean;
    reading_time: number;
    feed: Feed;
    enclosures: Enclosure[];
    tags: string[] | null;
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
                } else if (value) {
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

    async put<T>(path: string, data: any ): Promise<T> {
        if (!this.isAuthenticated) {
            return Promise.reject(new Error("client not authenticated"));
        }

        return fetch(`${this.host}/v1/${path}`, {
            headers: {
                'X-Auth-Token': this.token!,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(
            (response) => {
                if (response.status == 204) {
                    return '';
                } else {
                    return response.json()
                }
            }
        ).then((data) => {
            if (Object.hasOwn(data, "error_message")) {
                throw Error(data.error_message);
            } else {
                return data;
            }
        })
    }
}