'use client'
import { useState } from 'react'

export default function NewEmpleadoPage() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    legajo: '',
    reparticion: '',
    puesto: '',
    categoriaId: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validaciones básicas
    if (!form.nombre || !form.apellido || !form.legajo || !form.categoriaId) {
      setError('Por favor completa los campos obligatorios')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/empleados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          legajo: Number(form.legajo),
          categoriaId: Number(form.categoriaId)
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error creando empleado')
      }

      // Redirigir a la lista
      window.location.href = '/empleados'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Nuevo Empleado</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="legajo"
          type="number"
          placeholder="Legajo"
          value={form.legajo}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="reparticion"
          placeholder="Repartición"
          value={form.reparticion}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="puesto"
          placeholder="Puesto"
          value={form.puesto}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="categoriaId"
          type="number"
          placeholder="Categoría ID"
          value={form.categoriaId}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}
