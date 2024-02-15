export interface Author {
    avatar?: string;
    name: string;
    url: string;
}

export interface Item {
    author: Author;
    content_html: string;
    date_published: string;
    id: string;
    url?: string;
    title?: string
}

export interface Feed {
    items: Item[]
}

const get = async (url: string): Promise<Feed> => {
    let searchParams = new URLSearchParams({
        input: 'rss',
        output: 'jsonfeed',
        url: url
    });

    let response = await fetch(
        'https://granary.io/url?' + searchParams
    ).then((response) => response.json())
    
    return response;
}

export {
    get
}