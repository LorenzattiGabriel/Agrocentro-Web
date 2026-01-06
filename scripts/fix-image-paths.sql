-- Script para actualizar las rutas de imágenes en la base de datos
-- Agregar carpetas a las rutas que solo tienen nombres de archivo

-- IMPLEMENTOS NUEVOS: agregar "implementos/nuevos/" al inicio
UPDATE implementos
SET ids_imagenes = (
  SELECT array_agg('implementos/nuevos/' || unnest)
  FROM unnest(ids_imagenes)
)
WHERE "esNuevo" = true
AND NOT (ids_imagenes[1] LIKE '%/%'); -- Solo actualizar si NO tienen carpeta

-- IMPLEMENTOS USADOS: agregar "implementos/usados/" al inicio
UPDATE implementos
SET ids_imagenes = (
  SELECT array_agg('implementos/usados/' || unnest)
  FROM unnest(ids_imagenes)
)
WHERE "esNuevo" = false
AND NOT (ids_imagenes[1] LIKE '%/%'); -- Solo actualizar si NO tienen carpeta

-- REPUESTOS: agregar "repuestos/" al inicio
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg('repuestos/' || unnest)
  FROM unnest(ids_imagenes)
)
WHERE NOT (ids_imagenes[1] LIKE '%/%'); -- Solo actualizar si NO tienen carpeta

-- Verificar los cambios
SELECT 
  'Implementos Nuevos' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ids_imagenes[1] LIKE 'implementos/nuevos/%' THEN 1 END) as con_carpeta
FROM implementos
WHERE "esNuevo" = true AND array_length(ids_imagenes, 1) > 0

UNION ALL

SELECT 
  'Implementos Usados' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ids_imagenes[1] LIKE 'implementos/usados/%' THEN 1 END) as con_carpeta
FROM implementos
WHERE "esNuevo" = false AND array_length(ids_imagenes, 1) > 0

UNION ALL

SELECT 
  'Repuestos' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ids_imagenes[1] LIKE 'repuestos/%' THEN 1 END) as con_carpeta
FROM repuestos
WHERE array_length(ids_imagenes, 1) > 0;

