export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
    }
};

export const checkLogin = (isLogged) => {
    return {
        type: 'CHECK_LOGIN',
        isLogged
    }
}
export const login = (loginData) => {
    return {
        type: "LOGIN",
        loginData,
    }
}
export const logout = () => {
    return {
        type: "LOGOUT",
    }
}
export const connect = () => {
    return {
        type: "CONNECT"
    }
}
export const search = (input) => {
    return {
        type: "SEARCH",
        input
    }
};
export const disconnect = () => {
    return {
        type: "DISCONNECT"
    }
}
export const receiveNotification = (status, title, message) => {
    return {
        type: "RECEIVE_NOTIFICATION",
        notification: {
            status,
            title,
            message
        }
    }
}