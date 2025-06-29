import { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

interface RestartLog {
  id: string
  onu_name: string
  restarted_at: string
  reason?: string
}

const RestartHistory = () => {
  const [logs, setLogs] = useState<RestartLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axiosInstance.get('/api/restarts')
        setLogs(res.data)
      } catch (err) {
        toast.error('Error cargando el historial')
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historial de Reinicios</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : logs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 text-left">ONU</th>
                <th className="p-2 text-left">Fecha</th>
                <th className="p-2 text-left">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-2">{log.onu_name}</td>
                  <td className="p-2">{new Date(log.restarted_at).toLocaleString()}</td>
                  <td className="p-2">{log.reason || 'No especificado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay registros.</p>
      )}
    </div>
  )
}

export default RestartHistory
