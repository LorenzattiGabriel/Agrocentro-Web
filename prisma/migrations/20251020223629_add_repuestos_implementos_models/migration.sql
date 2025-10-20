-- CreateTable
CREATE TABLE "repuestos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "ids_imagenes" TEXT[],
    "marca" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "atributos" JSONB,

    CONSTRAINT "repuestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "implementos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "ids_imagenes" TEXT[],
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "esNuevo" BOOLEAN NOT NULL,
    "anio" INTEGER,
    "atributos" JSONB,

    CONSTRAINT "implementos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "repuestos_nombre_idx" ON "repuestos"("nombre");

-- CreateIndex
CREATE INDEX "repuestos_marca_idx" ON "repuestos"("marca");

-- CreateIndex
CREATE INDEX "repuestos_categoria_idx" ON "repuestos"("categoria");

-- CreateIndex
CREATE INDEX "implementos_nombre_idx" ON "implementos"("nombre");

-- CreateIndex
CREATE INDEX "implementos_marca_idx" ON "implementos"("marca");

-- CreateIndex
CREATE INDEX "implementos_categoria_idx" ON "implementos"("categoria");
