import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import OnuList from './pages/OnuList'
import OnuDetail from './pages/OnuDetail'
import RestartHistory from './pages/RestartHistory'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onus" element={<OnuList />} />
          <Route path="/onus/:id" element={<OnuDetail />} />
          <Route path="/restarts" element={<RestartHistory />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
