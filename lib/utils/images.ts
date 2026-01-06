/**
 * Detecta si una ruta de imagen es nueva (guardada desde el backoffice)
 * Las imágenes nuevas tienen formato: timestamp-random-nombre.png
 */
function isNewImage(imagePath: string): boolean {
  const fileName = imagePath.split('/').pop() || ''
  // Las imágenes nuevas tienen timestamp al inicio (números largos)
  const hasTimestamp = /^\d{13}-[a-z0-9]+-/.test(fileName) || /^test-\d{13}/.test(fileName)
  console.log('[isNewImage]', fileName, '→', hasTimestamp)
  return hasTimestamp
}

/**
 * Convierte una ruta de imagen a la URL completa con detección automática
 * @param imagePath - Ruta de la imagen (puede ser local o de Supabase)
 * @param productType - Tipo de producto (opcional: 'implementos' o 'repuestos')
 * @param isNew - Si es nuevo o usado (opcional, solo para implementos)
 * @returns URL completa de la imagen
 */
export function getImageUrl(
  imagePath: string | null | undefined, 
  productType?: 'implementos' | 'repuestos',
  isNew?: boolean
): string {
  console.log('[getImageUrl] Input:', imagePath, '| Type:', productType, '| IsNew:', isNew)
  
  // Si no hay imagen, retornar placeholder
  if (!imagePath) {
    console.log('[getImageUrl] No image path, using placeholder')
    return '/placeholder.svg'
  }

  // Si ya es una URL completa de Supabase, retornarla
  if (imagePath.includes('supabase.co/storage/v1/object/public/product-images/')) {
    console.log('[getImageUrl] Already Supabase URL')
    return imagePath
  }

  // Si ya es una URL completa http/https (pero no de Supabase Storage)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    console.log('[getImageUrl] External URL')
    return imagePath
  }

  // Si comienza con /images/products/, es una imagen LOCAL antigua
  if (imagePath.startsWith('/images/products/')) {
    console.log('[getImageUrl] Local absolute path')
    return imagePath
  }

  // Si comienza con /, es una ruta local absoluta
  if (imagePath.startsWith('/')) {
    console.log('[getImageUrl] Generic local path')
    return imagePath
  }

  // Si comienza con public/, convertir a ruta absoluta local
  if (imagePath.startsWith('public/')) {
    const localPath = '/' + imagePath
    console.log('[getImageUrl] Public path →', localPath)
    return localPath
  }

  // Para rutas relativas, detectar si es nueva o antigua
  // Rutas nuevas: "implementos/nuevos/1736137200000-abc123-nombre.png"
  // Rutas antiguas: "nombre-viejo.png" o "marca-modelo.jpg"
  
  // Si ya incluye la carpeta completa (implementos/nuevos/ o repuestos/)
  if (imagePath.includes('implementos/') || imagePath.includes('repuestos/')) {
    if (isNewImage(imagePath)) {
      // Imagen NUEVA → Supabase Storage
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (supabaseUrl) {
        const fullUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${imagePath}`
        console.log('[getImageUrl] New image with path → Supabase:', fullUrl)
        return fullUrl
      }
    }
    // Imagen antigua con carpeta → Local
    const localPath = `/images/products/${imagePath}`
    console.log('[getImageUrl] Old image with path → Local:', localPath)
    return localPath
  }

  // Solo nombre de archivo sin carpetas
  if (isNewImage(imagePath)) {
    // Imagen NUEVA del backoffice → Supabase Storage
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabaseUrl) {
      // Si tenemos tipo de producto, construir la ruta correcta
      let fullPath = imagePath
      if (productType === 'implementos' && isNew !== undefined) {
        fullPath = `implementos/${isNew ? 'nuevos' : 'usados'}/${imagePath}`
      } else if (productType === 'repuestos') {
        fullPath = `repuestos/${imagePath}`
      }
      const fullUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${fullPath}`
      console.log('[getImageUrl] New image (filename only) → Supabase:', fullUrl)
      return fullUrl
    }
  }

  // Imagen ANTIGUA (solo nombre de archivo) → Intentar construir ruta local
  if (productType && isNew !== undefined) {
    let folder = ''
    if (productType === 'implementos') {
      folder = isNew ? 'implementos/nuevos' : 'implementos/usados'
    } else if (productType === 'repuestos') {
      folder = 'repuestos'
    }
    const localPath = `/images/products/${folder}/${imagePath}`
    console.log('[getImageUrl] Old image (filename only) with context → Local:', localPath)
    return localPath
  }

  // Fallback: solo nombre de archivo sin contexto → Buscar en todas las carpetas de implementos/nuevos
  const localPath = `/images/products/implementos/nuevos/${imagePath}`
  console.log('[getImageUrl] Old image (filename only) no context → Fallback local:', localPath)
  return localPath
}

/**
 * Obtiene la URL de Supabase Storage para una imagen (para fallback)
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

  // Si comienza con /, quitar el prefijo
  let cleanPath = imagePath
  if (imagePath.startsWith('/')) {
    cleanPath = imagePath.substring(1)
  }

  // Construir URL de Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/product-images/${cleanPath}`
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

