import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: listar sueldos
export async function GET() {
  const sueldos = await prisma.sueldoMensual.findMany({
    include: { empleado: true }
  })
  return NextResponse.json(sueldos)
}

// POST: crear sueldo mensual (se calcula automáticamente)
export async function POST(req) {
  const data = await req.json()

  // Obtener categoría del empleado
  const empleado = await prisma.empleado.findUnique({
    where: { id: data.empleadoId },
    include: { categoria: true }
  })

  if (!empleado?.categoria) {
    return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 400 })
  }

  const sueldoBruto = empleado.categoria.sueldoBase
  const descuento = sueldoBruto * 0.21
  const sueldoNeto = sueldoBruto - descuento

  const sueldo = await prisma.sueldoMensual.create({
    data: {
      empleadoId: data.empleadoId,
      mes: data.mes,
      anio: data.anio,
      sueldoBruto,
      descuento,
      sueldoNeto,
      fechaPago: new Date(data.fechaPago),
      observaciones: data.observaciones || null
    }
  })

  return NextResponse.json(sueldo)
}