import dayjs, { type Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Enclosure } from '$lib/api';

dayjs.extend(relativeTime);

const domParser = new DOMParser();

export const domain = (url: string): string | null => {
    let domain = null;

    try {
        domain = new URL(url).hostname;
    } catch (e) {
        console.error(e);
    }

    return domain;
}

export const findEnclosure = (enclosures: Enclosure[], mime_type: string): Enclosure | undefined => {
    return enclosures.find((enclosure) => enclosure.mime_type.startsWith(mime_type));
};

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


export interface Grouped<T> {
    key: string;
    entries: {
        index: number;
        obj: T
    }[];
}

export const groupByTime = <
    T extends { [P in K]: string },
    K extends keyof T
>(
    objs: T[], 
    key: K
): Grouped<T>[] => {
    return objs.sort(
        (a, b) => {
            return (
                Date.parse(b[key]) - Date.parse(a[key])
            );
        }
    ).reduce((groups, obj, index) => {
        let value: string = dayjs(obj[key]).from(null);

        let group = groups.find(({ key }) => key == value);

        if (!group) {
            group = {
                key: value,
                entries: []
            }
            groups.push(group);
        }
        group.entries.push({
            index,
            obj
        });

        return groups;
    }, [] as Grouped<T>[]);
}