import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

interface Onu {
  id: string
  name: string
  status: string
  location: string
}

const OnuList = () => {
  const [onus, setOnus] = useState<Onu[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOnus = async () => {
    try {
      const res = await axiosInstance.get('/api/onus')
      setOnus(res.data)
    } catch (err) {
      toast.error('Error cargando ONUs')
    } finally {
      setLoading(false)
    }
  }

  const restartOnu = async (id: string) => {
    try {
      await axiosInstance.post(`/api/onus/${id}/restart`)
      toast.success('ONU reiniciada')
    } catch (err) {
      toast.error('Error al reiniciar la ONU')
    }
  }

  useEffect(() => {
    fetchOnus()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de ONUs</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">Ubicación</th>
                <th className="p-2 text-left">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {onus.map((onu) => (
                <tr key={onu.id} className="border-t">
                  <td className="p-2">{onu.name}</td>
                  <td className="p-2">{onu.location}</td>
                  <td className="p-2">{onu.status}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <Link
                      to={`/onus/${onu.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => restartOnu(onu.id)}
                      className="text-red-600 hover:underline"
                    >
                      Reiniciar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OnuList
