/*
  Warnings:

  - A unique constraint covering the columns `[nombre,marca,modelo,esNuevo]` on the table `implementos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre,marca]` on the table `repuestos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "implementos_nombre_marca_modelo_esNuevo_key" ON "implementos"("nombre", "marca", "modelo", "esNuevo");

-- CreateIndex
CREATE UNIQUE INDEX "repuestos_nombre_marca_key" ON "repuestos"("nombre", "marca");
