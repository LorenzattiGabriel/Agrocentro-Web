-- ==========================================
-- SCRIPT DE CONFIGURACIÓN DE SUPABASE STORAGE
-- ==========================================
-- Este script crea el bucket y configura las políticas necesarias
-- Para ejecutar: Copia y pega en Supabase SQL Editor

-- 1. Crear el bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB en bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Habilitar RLS en storage.objects (si no está habilitado)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Política para lectura pública (cualquiera puede ver las imágenes)
CREATE POLICY "Public Access to product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- 4. Política para que usuarios autenticados puedan subir imágenes
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- 5. Política para que usuarios autenticados puedan actualizar imágenes
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- 6. Política para que usuarios autenticados puedan eliminar imágenes
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- Verificar que se creó correctamente
SELECT * FROM storage.buckets WHERE id = 'product-images';

