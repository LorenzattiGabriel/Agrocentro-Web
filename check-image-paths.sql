-- Ver cómo están guardadas las rutas de imágenes
SELECT 
  id,
  nombre,
  categoria,
  es_nuevo as "esNuevo",
  ids_imagenes
FROM implementos 
WHERE array_length(ids_imagenes, 1) > 0
LIMIT 3;
