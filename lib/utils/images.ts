/**
 * Convierte una ruta de imagen a la URL completa de Supabase Storage con fallback local
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

  // Si comienza con /, es una ruta local absoluta - mantenerla para fallback
  if (imagePath.startsWith('/')) {
    return imagePath
  }

  // Si comienza con public/, convertir a ruta absoluta local
  if (imagePath.startsWith('public/')) {
    return '/' + imagePath
  }

  // Para rutas relativas (ej: "implementos/nuevos/imagen.png"), 
  // intentar primero Supabase, con fallback a local
  // La lógica de fallback se maneja con onError en el componente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/product-images/${imagePath}`
  }

  // Fallback: si no hay URL de Supabase, usar ruta local
  return `/images/products/${imagePath}`
}

/**
 * Obtiene la URL local de fallback para una imagen
 * @param imagePath - Ruta de la imagen
 * @returns URL local de la imagen
 */
export function getLocalImageUrl(imagePath: string): string {
  if (!imagePath) {
    return '/placeholder.svg'
  }

  // Si ya es una ruta absoluta local, retornarla
  if (imagePath.startsWith('/')) {
    return imagePath
  }

  // Si es una ruta de Supabase Storage, extraer el path relativo
  if (imagePath.includes('/storage/v1/object/public/product-images/')) {
    const relativePath = imagePath.split('/storage/v1/object/public/product-images/')[1]
    return `/images/products/${relativePath}`
  }

  // Para rutas relativas, agregar el prefijo local
  return `/images/products/${imagePath}`
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

