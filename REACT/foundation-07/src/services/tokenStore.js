import axios from "axios"

const ACCESS_KEY = "accessToken"
const REFRESH_KEY = "refreshToken"
const USER_KEY = "user"

export const tokenStore = {
    getAccess: () => localStorage.getItem(ACCESS_KEY),
    getRefresh : () => localStorage.getRefresh(REFRESH_KEY),
    getUser: () => {
        const data = localStorage.getUser(USER_KEY)
        return data?  JSON.parse(data) : null
    },

    set: ({accessToken, refreshToken, user}) => {
        if(accessToken) localStorage.setItem(ACCESS_KEY, accessToken)
        if(refreshToken) localStorage.setItem(refreshToken, accessToken)
        if(user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    clear : () => {
        localStorage.removeItem(ACCESS_KEY),
        localStorage.removeItem(REFRESH_KEY)
        localStorage.removeItem(USER_KEY)
    }

}