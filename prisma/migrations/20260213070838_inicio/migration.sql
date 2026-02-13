-- CreateTable
CREATE TABLE "Empleado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "legajo" INTEGER NOT NULL,
    "reparticion" TEXT NOT NULL,
    "puesto" TEXT,
    "categoriaId" INTEGER NOT NULL,
    "nivelAFE" TEXT DEFAULT 'No aplica',
    "fechaAlta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "sueldoBase" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SueldoMensual" (
    "id" SERIAL NOT NULL,
    "empleadoId" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "anio" INTEGER NOT NULL,
    "sueldoBruto" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "sueldoNeto" DOUBLE PRECISION NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "SueldoMensual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_legajo_key" ON "Empleado"("legajo");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_numero_key" ON "Categoria"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "SueldoMensual_empleadoId_mes_anio_key" ON "SueldoMensual"("empleadoId", "mes", "anio");

-- AddForeignKey
ALTER TABLE "Empleado" ADD CONSTRAINT "Empleado_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SueldoMensual" ADD CONSTRAINT "SueldoMensual_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
