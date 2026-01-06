-- Script para agregar la marca a las rutas de imágenes de repuestos
-- Estructura actual: repuestos/imagen.png
-- Estructura deseada: repuestos/marca/imagen.png

-- CRUCIANELLI
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/crucianelli/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Crucianelli'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- DARMET
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/darmet/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Darmet'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- GIORGI
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/giorgi/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Giorgi'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- JUTA
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/juta/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Juta'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- PARVAL
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/parval/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Parval'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- PRADO VERDE (con espacio, se convierte a guión)
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/prado-verde/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Prado Verde'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- VARIEDAD
UPDATE repuestos
SET ids_imagenes = (
  SELECT array_agg(replace(unnest, 'repuestos/', 'repuestos/variedad/'))
  FROM unnest(ids_imagenes)
)
WHERE marca = 'Variedad'
AND ids_imagenes[1] LIKE 'repuestos/%'
AND ids_imagenes[1] NOT LIKE 'repuestos/%/%';

-- Verificar los cambios
SELECT 
  'Total repuestos actualizados' as info,
  COUNT(*) as total,
  COUNT(CASE WHEN ids_imagenes[1] LIKE 'repuestos/%/%' THEN 1 END) as con_marca,
  COUNT(CASE WHEN ids_imagenes[1] LIKE 'repuestos/%' AND ids_imagenes[1] NOT LIKE 'repuestos/%/%' THEN 1 END) as sin_marca
FROM repuestos
WHERE array_length(ids_imagenes, 1) > 0;

-- Ver ejemplos de cada marca
SELECT marca, ids_imagenes[1] as primera_imagen
FROM repuestos
WHERE array_length(ids_imagenes, 1) > 0
GROUP BY marca, ids_imagenes[1]
ORDER BY marca
LIMIT 20;

