import { createSlice } from "@reduxjs/toolkit"


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: null,
        error: null
    },
    reducers: {
        addTodoSuccess: (state, action) => {
            state.todos = action.payload
        },
        addTodoFail: (state, action) => {
            state.user = null
            error = action.payload
        }
    }
})

export const {
    addTodoSuccess,
    addTodoFail
} = todoSlice.actions

export default todoSlice.reducer