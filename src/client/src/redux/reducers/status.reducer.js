const initialState = {
    isLogged: false,
    gmail: null,
    isConnected: false
}

export function statusReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHECK_LOGIN':
            return {
                ...state,
                isLogged: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                gmail: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogged: false,
                gmail: null
            };
        case 'CONNECT':
            return {
                ...state,
                isConnected: true
            };
        case 'DISCONNECT':
            return {
                ...state,
                isConnected: false
            };
        default:
            return state;
    }
}
