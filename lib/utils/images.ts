/**
 * Convierte una ruta de imagen a la URL completa con prioridad LOCAL (más rápido)
 * @param imagePath - Ruta de la imagen (puede ser local o de Supabase)
 * @returns URL completa de la imagen
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  // Si no hay imagen, retornar placeholder
  if (!imagePath) {
    return '/placeholder.svg'
  }

  // Si ya es una URL completa de Supabase, extraer solo el path relativo
  if (imagePath.includes('/storage/v1/object/public/product-images/')) {
    const relativePath = imagePath.split('/storage/v1/object/public/product-images/')[1]
    // PRIORIDAD: Usar local primero (más rápido, las imágenes aún no están migradas)
    return `/images/products/${relativePath}`
  }

  // Si ya es una URL completa http/https (pero no de Supabase Storage)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Si comienza con /, es una ruta local absoluta
  if (imagePath.startsWith('/')) {
    return imagePath
  }

  // Si comienza con public/, convertir a ruta absoluta local
  if (imagePath.startsWith('public/')) {
    return '/' + imagePath
  }

  // Para rutas relativas: PRIORIZAR LOCAL (más rápido mientras migra)
  // El componente ProductImage intentará Supabase si local falla
  return `/images/products/${imagePath}`
}

/**
 * Obtiene la URL de Supabase Storage para una imagen
 * @param imagePath - Ruta de la imagen
 * @returns URL de Supabase Storage
 */
export function getSupabaseImageUrl(imagePath: string): string {
  if (!imagePath) {
    return '/placeholder.svg'
  }

  // Si ya es una URL completa de Supabase, retornarla
  if (imagePath.includes('supabase.co/storage')) {
    return imagePath
  }

  // Si es una ruta local absoluta, extraer el path relativo
  if (imagePath.startsWith('/images/products/')) {
    const relativePath = imagePath.replace('/images/products/', '')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabaseUrl) {
      return `${supabaseUrl}/storage/v1/object/public/product-images/${relativePath}`
    }
  }

  // Para rutas relativas, construir URL de Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/product-images/${imagePath}`
  }

  return '/placeholder.svg'
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
  if (imagePath.startsWith('/images/products/')) {
    return imagePath
  }

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

