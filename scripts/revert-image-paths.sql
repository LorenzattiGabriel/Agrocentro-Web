-- REVERTIR TEMPORALMENTE: Quitar carpetas de las rutas
-- Esto es temporal hasta que el deploy de Vercel termine

-- IMPLEMENTOS NUEVOS: quitar "implementos/nuevos/"
UPDATE implementos
SET ids_imagenes = (
  SELECT array_agg(REPLACE(unnest, 'implementos/nuevos/', ''))
  FROM unnest(ids_imagenes)
)
WHERE "esNuevo" = true
AND ids_imagenes[1] LIKE 'implementos/nuevos/%';

-- IMPLEMENTOS USADOS: quitar "implementos/usados/"
UPDATE implementos
SET ids_imagenes = (
  SELECT array_agg(REPLACE(unnest, 'implementos/usados/', ''))
  FROM unnest(ids_imagenes)
)
WHERE "esNuevo" = false
AND ids_imagenes[1] LIKE 'implementos/usados/%';

-- REPUESTOS: quitar "repuestos/"
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(REPLACE(unnest, 'repuestos/', ''))
  FROM unnest(ids_imagenes)
)
WHERE ids_imagenes[1] LIKE 'repuestos/%';

-- Verificar
SELECT 'REVERTIDO' as estado, COUNT(*) as total FROM implementos WHERE array_length(ids_imagenes, 1) > 0;

