const initialState = {
    isLogged: false,
    gmail: null,
    password: null,
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
                gmail: action.payload.gmail,
                password: action.payload.password
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogged: false
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
