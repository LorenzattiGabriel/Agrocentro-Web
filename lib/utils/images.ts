// ============================================================================
// CONSTANTS
// ============================================================================

const PLACEHOLDER_IMAGE = '/placeholder.svg'
const LOCAL_IMAGES_BASE = '/images/products'
const SUPABASE_BUCKET = 'product-images'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type ProductType = 'implementos' | 'repuestos'

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Detecta si una imagen es nueva (subida desde el backoffice con timestamp)
 */
function isNewImage(fileName: string): boolean {
  const hasTimestamp = /^\d{13}-[a-z0-9]+-/.test(fileName) || /^test-\d{13}/.test(fileName)
  return hasTimestamp
}

/**
 * Verifica si una ruta es una URL completa
 */
function isFullUrl(path: string): boolean {
  return path.startsWith('http://') || path.startsWith('https://')
}

/**
 * Verifica si una ruta ya incluye la estructura de carpetas
 */
function hasFolder(path: string): boolean {
  return path.includes('implementos/') || path.includes('repuestos/')
}

/**
 * Construye la ruta de carpeta según el tipo de producto
 */
function buildFolder(productType: ProductType, isNew?: boolean): string {
  if (productType === 'repuestos') {
    return 'repuestos'
  }
  
  if (productType === 'implementos' && isNew !== undefined) {
    return `implementos/${isNew ? 'nuevos' : 'usados'}`
  }
  
  return 'implementos/nuevos' // Fallback
}

/**
 * Construye una URL de Supabase Storage
 */
function buildSupabaseUrl(path: string): string | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null
  
  return `${supabaseUrl}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`
}

/**
 * Construye una ruta local
 */
function buildLocalUrl(path: string): string {
  return `${LOCAL_IMAGES_BASE}/${path}`
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Convierte una ruta de imagen a URL completa con estrategia inteligente:
 * 
 * 1. URLs externas → retornar tal cual
 * 2. Rutas absolutas locales → retornar tal cual
 * 3. Rutas con carpetas (implementos/nuevos/):
 *    - Si tiene timestamp → Supabase Storage
 *    - Si no → Local (/images/products/)
 * 4. Solo nombre de archivo:
 *    - Si tiene timestamp → Supabase Storage (agregar carpeta)
 *    - Si no → Local (agregar carpeta)
 * 
 * @param imagePath - Ruta de la imagen (puede ser local, de Supabase, o solo nombre)
 * @param productType - Tipo de producto ('implementos' o 'repuestos')
 * @param isNew - Si es nuevo o usado (solo para implementos)
 * @returns URL completa de la imagen
 */
export function getImageUrl(
  imagePath: string | null | undefined,
  productType?: ProductType,
  isNew?: boolean
): string {
  // Validación inicial
  if (!imagePath) return PLACEHOLDER_IMAGE

  // Casos directos (sin procesamiento)
  if (isFullUrl(imagePath)) return imagePath
  if (imagePath.startsWith('/')) return imagePath
  if (imagePath.startsWith('public/')) return `/${imagePath}`

  // Extraer nombre de archivo
  const fileName = imagePath.split('/').pop() || imagePath
  const isNewImg = isNewImage(fileName)

  // CASO 1: Ruta ya tiene carpetas (implementos/nuevos/imagen.png)
  if (hasFolder(imagePath)) {
    if (isNewImg) {
      const supabaseUrl = buildSupabaseUrl(imagePath)
      if (supabaseUrl) return supabaseUrl
    }
    return buildLocalUrl(imagePath)
  }

  // CASO 2: Solo nombre de archivo - necesita carpeta
  const folder = productType ? buildFolder(productType, isNew) : 'implementos/nuevos'
  const fullPath = `${folder}/${imagePath}`

  if (isNewImg) {
    const supabaseUrl = buildSupabaseUrl(fullPath)
    if (supabaseUrl) return supabaseUrl
  }

  return buildLocalUrl(fullPath)
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

