import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { loginUser, logout } from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { token, loading, error } = useSelector((state: RootState) => state.auth)

  const login = (username: string, password: string) => {
    dispatch(loginUser({ username, password }))
  }

  const signOut = () => {
    dispatch(logout())
  }

  return { token, loading, error, login, logout: signOut }
}
