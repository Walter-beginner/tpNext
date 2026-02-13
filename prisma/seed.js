import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.Categoria.createMany({
    data: [
      { numero: 1, sueldoBase: 700000 },
      { numero: 2, sueldoBase: 745000 },
      { numero: 3, sueldoBase: 800000 },
      { numero: 4, sueldoBase: 850000 },
      { numero: 5, sueldoBase: 920000 },
    ]
  })
}

main()
  .then(() => console.log('Categorías creadas'))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
