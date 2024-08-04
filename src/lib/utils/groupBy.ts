export interface Grouped<T> {
    key: string;
    entries: {
        index: number;
        obj: T
    }[];
}

export default <
    T extends { [P in K]: string },
    K extends keyof T
>(
    objs: T[], 
    groupBy: K,
    format?: (value: T[K]) => any
): Grouped<T>[] => {
    return objs.reduce((groups, obj, index) => {
        let groupKey = obj[groupBy];

        if (format) {
            groupKey = format(groupKey);
        }

        let group = groups.find(({ key }) => key == groupKey);

        if (!group) {
            group = {
                key: groupKey,
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