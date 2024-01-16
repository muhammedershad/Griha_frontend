import { createSlice } from '@reduxjs/toolkit'
import User from '../../../interfaces/user'
import { RootState } from '../store'

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
    userloginSuccess: (state = initialState, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = false
    },
    userloginFailed: (state,) => {
        state.error = true
    },  
    userlogout: (state,) => {
        state.user = null
        state.error = false
        state.token = null
    }
  },
})

export const selectCount = (state: RootState) => state.employee.employee
// Action creators are generated for each case reducer function
export const { userloginSuccess, userloginFailed, userlogout } = userSlice.actions

export default userSlice.reducer
