import axios from 'axios'
import {loginUser,updateUserInfo} from '../slice/slice.jsx'
import store from '../store/store.jsx'
import {jwtDecode} from 'jwt-decode'

let accessToken = sessionStorage.getItem('accessToken') || null
let refreshTimer = null

export const setAccessToken = (token)=>{
    accessToken = token
    if(token){
        sessionStorage.setItem('accessToken', token)
        scheduleTokenRefresh(token)
    } else {
        sessionStorage.removeItem('accessToken')
        if(refreshTimer){
            clearTimeout(refreshTimer)
            refreshTimer = null
        }
    }
}

const scheduleTokenRefresh = (token) => {
    if(refreshTimer){
        clearTimeout(refreshTimer)
    }
    
    try {
        const decoded = jwtDecode(token)
        const expiresIn = decoded.exp * 1000 - Date.now()
        
        const refreshTime = Math.max(expiresIn - 30000, expiresIn * 0.9)
        
        if(refreshTime > 0){
            refreshTimer = setTimeout(async () => {
                try {
                    const response = await api.post('/user/refresh/token')
                    const newAccessToken = response.data.data.newAccessToken
                    setAccessToken(newAccessToken)
                    
                    const data = jwtDecode(newAccessToken)
                    store.dispatch(loginUser(true))
                    store.dispatch(updateUserInfo(data))
                } catch (err) {
                    console.error('Token refresh failed:', err)
                    setAccessToken(null)
                    store.dispatch(loginUser(false))
                    store.dispatch(updateUserInfo(null))
                }
            }, refreshTime)
        }
    } catch (err) {
        console.error('Failed to decode token:', err)
    }
}


if(accessToken){
    scheduleTokenRefresh(accessToken)
}

const api = axios.create({
    baseURL:'http://localhost:5000/api',
    withCredentials:true
})

api.interceptors.request.use((config)=>{
    if(accessToken && !config.url.includes('/user/refresh/token')) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error)=>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && 
           !originalRequest._retry && 
           !originalRequest.url.includes('/user/refresh/token')){
            
            originalRequest._retry = true
            
            try{
                const response = await api.post('/user/refresh/token')
                const newAccessToken = response.data.data.newAccessToken
                
                setAccessToken(newAccessToken)
                
                const data = jwtDecode(newAccessToken)
                store.dispatch(loginUser(true))
                store.dispatch(updateUserInfo(data))
                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)

            }catch(err){
               
                setAccessToken(null)
                store.dispatch(loginUser(false))
                store.dispatch(updateUserInfo(null))

                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default api