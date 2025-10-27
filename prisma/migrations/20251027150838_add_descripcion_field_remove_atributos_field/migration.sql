/*
  Warnings:

  - You are about to drop the column `atributos` on the `implementos` table. All the data in the column will be lost.
  - You are about to drop the column `atributos` on the `repuestos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "implementos" DROP COLUMN "atributos",
ADD COLUMN     "descripcion" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "repuestos" DROP COLUMN "atributos",
ADD COLUMN     "descripcion" TEXT NOT NULL DEFAULT '';
