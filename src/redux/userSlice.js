import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: {
            loading: false,
            user: null,
            error: null
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.loading = true
        },
        loginSuccess: (state, action) => {
            state.login.loading = false
            state.login.user = action.payload
        },
        loginFail: (state) => {
            state.login.loading = false
            state.login.error = true
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFail
} = userSlice.actions

export default userSlice.reducer