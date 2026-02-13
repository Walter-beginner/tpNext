import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function GET(_, { params }) {
  const empleado = await prisma.empleado.findUnique({
    where: { id: Number(params.id) },
    include: { sueldos: true }
  })
  return NextResponse.json(empleado)
}

export async function PUT(req, { params }) {
  const data = await req.json()
  const empleado = await prisma.empleado.update({
    where: { id: Number(params.id) },
    data
  })
  return NextResponse.json(empleado)
}

export async function DELETE(_, { params }) {
  await prisma.empleado.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ message: 'Empleado eliminado' })
}