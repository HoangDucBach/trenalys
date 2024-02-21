export const checkLogin = (isLogged) => {
    return {
        type: 'CHECK_LOGIN',
        isLogged
    }
}
export const login = (gmail, password) => {
    return {
        type:"LOGIN",
        gmail: gmail,
        password: password,
    }
}
