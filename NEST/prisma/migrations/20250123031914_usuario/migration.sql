-- CreateTable
CREATE TABLE "Usuario" (
    "Id" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Correo" TEXT NOT NULL,
    "Contrasena" TEXT NOT NULL,
    "Rol" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Correo_key" ON "Usuario"("Correo");
