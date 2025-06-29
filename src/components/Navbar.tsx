import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/onus">ONUs</Link>
        <Link to="/restarts">Reinicios</Link>
      </div>
      <button onClick={handleLogout} className="text-white hover:underline">
        Cerrar sesión
      </button>
    </nav>
  )
}

export default Navbar
