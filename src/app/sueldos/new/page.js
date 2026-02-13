'use client'
import { useState } from 'react'

export default function NewSueldoPage() {
  const [form, setForm] = useState({
    empleadoId: '',
    mes: 1,
    anio: 2026,
    fechaPago: '',
    observaciones: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('/api/sueldos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    window.location.href = '/sueldos'
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrar Sueldo Mensual</h1>
      <input placeholder="Empleado ID" type="number"
        onChange={e => setForm({ ...form, empleadoId: Number(e.target.value) })} />
      <input placeholder="Mes (1-12)" type="number"
        onChange={e => setForm({ ...form, mes: Number(e.target.value) })} />
      <input placeholder="Año" type="number"
        onChange={e => setForm({ ...form, anio: Number(e.target.value) })} />
      <input placeholder="Fecha de pago" type="date"
        onChange={e => setForm({ ...form, fechaPago: e.target.value })} />
      <input placeholder="Observaciones"
        onChange={e => setForm({ ...form, observaciones: e.target.value })} />
      <button type="submit">Guardar</button>
    </form>
  )
}