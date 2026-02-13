'use client'

import { useEffect, useState } from 'react'

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingEmpleado, setEditingEmpleado] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    legajo: '',
    reparticion: '',
    puesto: '',
    categoriaId: ''
  })

  // Cargar empleados al montar
  useEffect(() => {
    fetchEmpleados()
  }, [])

  const fetchEmpleados = async () => {
    try {
      const res = await fetch('/api/empleados')
      if (!res.ok) throw new Error('Error al cargar empleados')
      const data = await res.json()
      setEmpleados(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Editar empleado
  const handleEditClick = (empleado) => {
    setEditingEmpleado(empleado)
    setFormData({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      legajo: empleado.legajo,
      reparticion: empleado.reparticion,
      puesto: empleado.puesto || '',
      categoriaId: empleado.categoriaId
    })
  }

  // Manejo de cambios en el formulario
  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Guardar cambios
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/empleados/${editingEmpleado.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          legajo: Number(formData.legajo),
          categoriaId: Number(formData.categoriaId)
        })
      })
      if (!res.ok) throw new Error('Error actualizando empleado')
      setEditingEmpleado(null)
      fetchEmpleados()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p className="p-4">Cargando empleados...</p>
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>

      <a
        href="/empleados/new"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Nuevo empleado
      </a>

      <ul className="list-disc pl-5">
        {empleados.map(e => (
          <li key={e.id} className="mb-2 flex justify-between items-center">
            <span>
              {e.nombre} {e.apellido} - {e.puesto || 'Sin puesto'}
            </span>
            <button
              onClick={() => handleEditClick(e)}
              className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      {/* Modal edición */}
      {editingEmpleado && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Editar Empleado</h2>

            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleFormChange}
              placeholder="Nombre"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="apellido"
              value={formData.apellido}
              onChange={handleFormChange}
              placeholder="Apellido"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="legajo"
              value={formData.legajo}
              onChange={handleFormChange}
              placeholder="Legajo"
              type="number"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="reparticion"
              value={formData.reparticion}
              onChange={handleFormChange}
              placeholder="Repartición"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="puesto"
              value={formData.puesto}
              onChange={handleFormChange}
              placeholder="Puesto"
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleFormChange}
              placeholder="Categoria ID"
              type="number"
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingEmpleado(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
