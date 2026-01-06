import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Genera la URL pública de una imagen en Supabase Storage
 * @param imagePath - Ruta relativa de la imagen (ej: "implementos/nuevos/imagen.jpg")
 * @returns URL completa de la imagen o placeholder si no hay imagen
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return '/placeholder.svg';
  }

  // Si ya es una URL completa (http/https), retornarla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Generar URL de Supabase Storage
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(imagePath);

  return data.publicUrl || '/placeholder.svg';
}

/**
 * Genera URLs públicas para un array de imágenes
 * @param imagePaths - Array de rutas de imágenes
 * @returns Array de URLs completas
 */
export function getImageUrls(imagePaths: string[]): string[] {
  if (!imagePaths || imagePaths.length === 0) {
    return ['/placeholder.svg'];
  }

  return imagePaths.map(path => getImageUrl(path));
}

