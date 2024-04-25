import axios from '../instance-axios'

const createTodo = (description) => {
    return axios.post('todo/createTodo', { description })
}

const getTodo = (userId) => {
    return axios.get(`todo/getTodo`, { userId })
}
const updateTodo = (id, description) => {
    return axios.put(`todo/updateTodo/${id}`, { description })
}
const deleteTodo = (id, deletedAt) => {
    return axios.put(`todo/deleteTodo`, { id, deletedAt })
}
const restoreTodo = (id) => {
    return axios.put(`todo/restoreTodo`, { id })
}

export { createTodo, getTodo, updateTodo, deleteTodo, restoreTodo }