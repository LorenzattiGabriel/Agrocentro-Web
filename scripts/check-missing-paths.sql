-- Encontrar el implemento usado que no tiene carpeta
SELECT 
  id,
  nombre,
  marca,
  "esNuevo",
  ids_imagenes
FROM implementos
WHERE "esNuevo" = false
AND array_length(ids_imagenes, 1) > 0
AND NOT (ids_imagenes[1] LIKE 'implementos/usados/%');
