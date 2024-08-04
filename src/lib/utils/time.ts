import dayjs from "dayjs";

export const diffWeekOfYear = (
    a: dayjs.ConfigType, 
    b: dayjs.ConfigType
): number => {
    let aWeek = dayjs(a).week();
    let bWeek = dayjs(b).week();

    return aWeek - bWeek;
}

/**
 * Sorts an array of objects by datetime key.
 * 
 * @param array Array of objects to sort. Each object must contain `key`.
 * @param key Key to parse as datetime and compare as
 * @returns The sorted array
 */
export const sortByTime = <
    T extends { [P in K]: string },
    K extends keyof T
>(array: T[], key: K, ascending = true): T[] => {
    return array.sort((a, b) => {
        let bKey = Date.parse(b[key]);
        let aKey = Date.parse(a[key]);

        return ascending ? bKey - aKey : aKey - bKey;
    });
}


export const relativeTimeToGroup = (a: dayjs.ConfigType): string => {
    let now = dayjs(Date.now());
    let then = dayjs(a);

    let daysAgo = now.diff(then, 'd');
    let weeksAgo = diffWeekOfYear(now, then);
    let monthsAgo = now.month() - then.month();

    let value: string;

    if (daysAgo == 0) {
        value = 'Today';
    } else if (daysAgo == 1) {
        value = 'Yesterday';
    } else if (weeksAgo == 0) {
        value = 'This week';
    } else if (weeksAgo == 1) {
        value = 'Last week';
    } else if (monthsAgo == 0) {
        value = 'This month';
    } else {
        value = 'Older';
    }

    return value;
}