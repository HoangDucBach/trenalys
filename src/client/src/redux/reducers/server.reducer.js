const initialState = {
    dashboard: {
        home:{
            trends: []
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
        default:
            return state;
    }
}