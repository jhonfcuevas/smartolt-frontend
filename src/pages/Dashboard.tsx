import { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

interface Stats {
  total_onus: number
  active_onus: number
  restarted_today: number
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/api/dashboard/stats')
        setStats(res.data)
      } catch (err) {
        toast.error('Error cargando estadísticas')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : stats ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-white rounded shadow text-center">
            <h2 className="text-xl font-semibold">ONUs Totales</h2>
            <p className="text-3xl">{stats.total_onus}</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <h2 className="text-xl font-semibold">ONUs Activas</h2>
            <p className="text-3xl">{stats.active_onus}</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <h2 className="text-xl font-semibold">Reinicios Hoy</h2>
            <p className="text-3xl">{stats.restarted_today}</p>
          </div>
        </div>
      ) : (
        <p>No hay estadísticas disponibles.</p>
      )}
    </div>
  )
}

export default Dashboard
