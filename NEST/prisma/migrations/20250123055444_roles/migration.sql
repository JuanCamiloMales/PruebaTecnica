/*
  Warnings:

  - Changed the type of `Estado` on the `Comerciante` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Rol` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "rol" AS ENUM ('ADMINISTRADOR', 'AUXILIARDEREGISTRO');

-- CreateEnum
CREATE TYPE "estado" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Comerciante" DROP COLUMN "Estado",
ADD COLUMN     "Estado" "estado" NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "Rol",
ADD COLUMN     "Rol" "rol" NOT NULL;
