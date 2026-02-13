import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: listar categorías
export async function GET() {
  const categorias = await prisma.categoria.findMany()
  return NextResponse.json(categorias)
}

// POST: crear categoría
export async function POST(req) {
  const data = await req.json()
  const categoria = await prisma.categoria.create({ data })
  return NextResponse.json(categoria)
}