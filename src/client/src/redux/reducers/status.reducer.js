const initialState = {
    isLogged: false
}
export function statusReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHECK_LOGIN':
            return {
                ...state,
                isLogged: action.payload
            }
        default:
            return state;
    }
}