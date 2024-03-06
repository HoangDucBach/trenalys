export const filterData = (data, filter) => {
    if (!filter) {
        return [...data];
    }
    return [...data].filter(item => item.name.toLowerCase().startsWith(filter.toLowerCase()));
};

export const sortData = (data, compareFunction) => {
    if (!compareFunction) {
        return data;
    }
    return data.sort(compareFunction);
};