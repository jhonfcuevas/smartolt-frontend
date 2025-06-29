import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, token, error, loading } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(username, password)
  }

  useEffect(() => {
    if (token) {
      toast.success('Login exitoso')
      navigate('/dashboard')
    }
    if (error) {
      toast.error(error)
    }
  }, [token, error, navigate])

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default Login
