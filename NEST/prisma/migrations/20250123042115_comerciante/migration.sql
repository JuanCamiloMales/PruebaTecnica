/*
  Warnings:

  - You are about to drop the column `Correo` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `CorreoElectronico` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_Correo_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "Correo",
ADD COLUMN     "CorreoElectronico" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Comerciante" (
    "Id" SERIAL NOT NULL,
    "NombreRazonSocial" TEXT NOT NULL,
    "Municipio" TEXT NOT NULL,
    "Telefono" TEXT NOT NULL,
    "CorreoElectronico" TEXT NOT NULL,
    "FechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Estado" TEXT NOT NULL,
    "FechaActualizacion" TIMESTAMP(3) NOT NULL,
    "UsuarioId" INTEGER NOT NULL,

    CONSTRAINT "Comerciante_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Comerciante" ADD CONSTRAINT "Comerciante_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
