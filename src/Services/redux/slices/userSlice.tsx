import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  error: false,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = false
    },
    loginFailed: (state,) => {
        state.error = true
    },  
    logout: (state,) => {
        state.user = null
        state.error = false
        state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailed, logout } = userSlice.actions

export default userSlice.reducer