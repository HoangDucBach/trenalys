const initialState = {
    isLogged: false,
    gmail: null,
    password: null,
    isConnected: false,
    notification: {
        isAvailable: false,
        status: '',
        title: '',
        message: ''
    },
    search: ''
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
                password: action.payload.password,
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
        case 'SEARCH':
            return {
                ...state,
                search: action.payload
            };
        case 'DISCONNECT':
            return {
                ...state,
                isConnected: false
            };
        case 'RECEIVE_NOTIFICATION':
            return {
                ...state,
                notification: {
                    isAvailable: true,
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message
                }
            }
        case 'CLEAR_NOTIFICATION':
            return {
                ...state,
                notification: {
                    isAvailable: false,
                    status: '',
                    title: '',
                    message: ''
                }
            }
        default:
            return state;
    }
}
