import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: null,
  token: null,
  error: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.admin = action.payload.admin
        state.error = false
        state.token = action.payload.token
    },
    loginFailed: (state,) => {
        state.error = true
    },
    logout: (state,) => {
        state.admin = null
        state.error = false
        state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailed, logout } = adminSlice.actions

export default adminSlice.reducer