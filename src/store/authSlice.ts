import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'

interface AuthState {
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials)
      return response.data.token
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
