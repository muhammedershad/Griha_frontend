import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from '../../../interfaces/user'

export interface UserSlice {
  user: User | null
  token: string | null,
  error: boolean 
}

const initialState: UserSlice = {
  user: null,
  error: false,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserSlice>) => {
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
