import axios from '../instance-axios.js'

const registerUser = (username, email, password) => {
    return axios.post('/users/register', { username, email, password })
}
const login = (email, password) => {
    return axios.post('/users/login', { email, password })
}
const logout = (userId) => {
    return axios.post('/users/logout', { userId })
}
const refreshToken = () => {
    return axios.post('/users/refreshToken')
}

export { registerUser, login, logout, refreshToken }