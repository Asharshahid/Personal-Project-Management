export const loginStart = ()=>{
    return {
        type:"LOGIN_START"
    }
}

export const loginSuccess = (user)=>{
    return {
        type:"LOGIN_SUCCESS",
        payload:user
    }
}

export const loginFailed = ()=>{
    return {
        type:"LOGIN_FAILED"
    }
}

export const logout = ()=>{
    return {
        type:"LOGOUT"
    }
}
