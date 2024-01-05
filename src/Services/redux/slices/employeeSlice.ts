import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employee: null,
  token: null,
  error: false,
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.employee = action.payload.employee
        state.error = false
        state.token = action.payload.token
    },
    loginFailed: (state,) => {
        state.error = true
    },
    logout: (state,) => {
        state.employee = null
        state.error = false
        state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailed, logout } = employeeSlice.actions

export default employeeSlice.reducer