import  prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const empleados = await prisma.Empleado.findMany({
      include: { categoria: true, sueldos: true }
    })
    return NextResponse.json(empleados)
  } catch (error) {
    console.error('Error GET /empleados:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const data = await req.json()

    if (!data.nombre || !data.apellido || !data.legajo || !data.categoriaId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const nuevoEmpleado = await prisma.Empleado.create({ data })
    return NextResponse.json(nuevoEmpleado, { status: 201 })
  } catch (error) {
    console.error('Error POST /empleados:', error)
    return NextResponse.json({ error: 'Error creando empleado' }, { status: 500 })
  }
}


/*export async function GET() {
  try {
    const empleados = await prisma.Empleado.findMany({
      include: { categoria: true, sueldos: true } // opcional, si quieres info relacionada
    })
    return NextResponse.json(empleados)
  } catch (error) {
    console.error('Error GET /empleados:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const data = await req.json()

    if (!data.nombre || !data.apellido || !data.legajo || !data.categoriaId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const nuevoEmpleado = await prisma.empleado.create({ data })
    return NextResponse.json(nuevoEmpleado, { status: 201 })
  } catch (error) {
    console.error('Error POST /empleados:', error)
    return NextResponse.json({ error: 'Error creando empleado' }, { status: 500 })
  }
}
*/