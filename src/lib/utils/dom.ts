const domParser = new DOMParser();

export const findExternalLinks = (content: string): string[] => {
    /* Locates links posted as links, i.e. title matches href */
    let document = domParser.parseFromString(content, "text/html");

    return Array.from(document.querySelectorAll("a")).filter(
        (element) => {
            return element.href == element.innerText;
        },
    ).map((el) => el.href);
};

export const removeDomElements = (html: string, selector: string): string => {
    let document: Document = domParser.parseFromString(html, "text/html");

    document
        .querySelectorAll(selector)
        .forEach((el) => el.remove());

    return document.documentElement.outerHTML;
}

export const stripYouTubeIframes = (content: string): string => {
    return removeDomElements(content, 'iframe[src*="www.youtube"]')
};