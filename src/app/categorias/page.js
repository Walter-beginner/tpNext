'use client'
import { useState, useEffect } from 'react'

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({ numero: '', sueldoBase: '' })

  useEffect(() => {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(setCategorias)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('/api/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    window.location.reload()
  }

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categorias.map(c => (
          <li key={c.id}>Categoría {c.numero}: ${c.sueldoBase}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h2>Agregar/Actualizar Categoría</h2>
        <input placeholder="Número (1-11)" type="number"
          onChange={e => setForm({ ...form, numero: Number(e.target.value) })} />
        <input placeholder="Sueldo Base" type="number"
          onChange={e => setForm({ ...form, sueldoBase: Number(e.target.value) })} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}