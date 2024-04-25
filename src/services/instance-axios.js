import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { refreshToken } from './authAPI/userService'


const instance = axios.create({
    baseURL: 'http://localhost:8001/api',
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('accessToken')

    config.headers['Authorization'] = 'Bearer ' + accessToken

    if (!accessToken) {
        window.location.href('/users/login')
        return
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const { data } = await refreshToken()
                localStorage.setItem('accessToken', data.accessToken)
                return instance(originalRequest)
            } catch (refreshError) {
                // Xử lý lỗi refresh token
                console.error('Error refreshing token:', refreshError)
                // Redirect to login page or handle accordingly
            }
        }
        return Promise.reject(error);
    }
)

export default instance