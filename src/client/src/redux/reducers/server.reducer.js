const initialState = {
    dashboard: {
        home:{
            trends: [],
            sortType: 'id',
            sortOrder: 'asc'
        }
    },
}
export function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_TRENDS':
            return {
                ...state,
                dashboard: {
                    home: {
                        trends: action.payload
                    }
                }
            }
        case 'FILTER_TRENDS':
            return {
                ...state,
                dashboard: {
                    home: {
                        ...state.dashboard.home,
                        filter: action.payload
                    }
                }
            }
        case 'SORT_TRENDS':
            return {
                ...state,
                dashboard: {
                    home: {
                        ...state.dashboard.home,
                        sortType: action.payload.sortType,
                        sortOrder: action.payload.sortOrder
                    }
                }
            }
        default:
            return state;
    }
}