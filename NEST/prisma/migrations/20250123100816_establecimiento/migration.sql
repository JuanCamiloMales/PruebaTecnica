-- CreateTable
CREATE TABLE "Establecimiento" (
    "Id" SERIAL NOT NULL,
    "NombreEstablecimiento" TEXT NOT NULL,
    "Ingresos" DOUBLE PRECISION NOT NULL,
    "NumEmpleados" INTEGER NOT NULL,
    "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaActualizacion" TIMESTAMP(3),
    "ComercianteId" INTEGER NOT NULL,
    "UsuarioId" INTEGER NOT NULL,

    CONSTRAINT "Establecimiento_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Establecimiento" ADD CONSTRAINT "Establecimiento_ComercianteId_fkey" FOREIGN KEY ("ComercianteId") REFERENCES "Comerciante"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establecimiento" ADD CONSTRAINT "Establecimiento_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
