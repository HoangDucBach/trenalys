const initialState = {
    isLogged: false,
    gmail: '',
    password: '',

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
            }
        default:
            return state;
    }
}