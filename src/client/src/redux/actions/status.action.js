export const checkLogin = (isLogged) => {
    return {
        type: 'CHECK_LOGIN',
        isLogged
    }
}