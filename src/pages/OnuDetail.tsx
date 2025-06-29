import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

interface OnuDetail {
  id: string
  name: string
  status: string
  location: string
  serial: string
  model: string
  last_reboot: string
}

const OnuDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [onu, setOnu] = useState<OnuDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOnu = async () => {
      try {
        const res = await axiosInstance.get(`/api/onus/${id}`)
        setOnu(res.data)
      } catch (err) {
        toast.error('Error cargando la ONU')
      } finally {
        setLoading(false)
      }
    }

    fetchOnu()
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalle de ONU</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : onu ? (
        <div className="bg-white p-6 rounded shadow space-y-2">
          <p><strong>ID:</strong> {onu.id}</p>
          <p><strong>Nombre:</strong> {onu.name}</p>
          <p><strong>Modelo:</strong> {onu.model}</p>
          <p><strong>Serial:</strong> {onu.serial}</p>
          <p><strong>Ubicación:</strong> {onu.location}</p>
          <p><strong>Estado:</strong> {onu.status}</p>
          <p><strong>Último reinicio:</strong> {onu.last_reboot}</p>
        </div>
      ) : (
        <p>ONU no encontrada.</p>
      )}
    </div>
  )
}

export default OnuDetail
