/**
 * Convierte una ruta de imagen a la URL completa de Supabase Storage
 * @param imagePath - Ruta de la imagen (puede ser local o de Supabase)
 * @returns URL completa de la imagen
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  // Si no hay imagen, retornar placeholder
  if (!imagePath) {
    return '/placeholder.svg'
  }

  // Si ya es una URL completa (http/https), retornarla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Si comienza con /public/ o /images/, convertir a ruta de Supabase
  // Esto es para compatibilidad con imágenes locales antiguas
  if (imagePath.startsWith('/public/images/products/')) {
    const relativePath = imagePath.replace('/public/images/products/', '')
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${relativePath}`
  }

  if (imagePath.startsWith('/images/products/')) {
    const relativePath = imagePath.replace('/images/products/', '')
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${relativePath}`
  }

  // Si comienza con /, es una ruta local absoluta
  if (imagePath.startsWith('/')) {
    return imagePath
  }

  // Si no comienza con /, asumir que es una ruta relativa de Supabase Storage
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${imagePath}`
}

/**
 * Convierte un array de rutas de imágenes a URLs completas
 * @param imagePaths - Array de rutas de imágenes
 * @returns Array de URLs completas
 */
export function getImageUrls(imagePaths: string[] | null | undefined): string[] {
  if (!imagePaths || imagePaths.length === 0) {
    return ['/placeholder.svg']
  }

  return imagePaths.map(getImageUrl)
}

/**
 * Obtiene la primera imagen de un array o el placeholder
 * @param imagePaths - Array de rutas de imágenes
 * @returns URL de la primera imagen o placeholder
 */
export function getFirstImageUrl(imagePaths: string[] | null | undefined): string {
  if (!imagePaths || imagePaths.length === 0) {
    return '/placeholder.svg'
  }

  return getImageUrl(imagePaths[0])
}

