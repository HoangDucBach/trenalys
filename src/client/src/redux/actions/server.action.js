export function getTrends(trends) {
    return {
        type: 'GET_TRENDS',
        payload: trends
    }
}
export function filterTrends(filter) {
    return {
        type: 'FILTER_TRENDS',
        payload: filter
    }
}
export function sortTrends(sortType, sortOrder) {
    return {
        type: 'SORT_TRENDS',
        payload: {
            sortType,
            sortOrder
        }
    }
}