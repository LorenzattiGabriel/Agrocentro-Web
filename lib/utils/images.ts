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
 * Limpia URLs malformadas que puedan estar en la base de datos
 * Ejemplos de URLs rotas:
 * - "https:/domain.com" (falta una /)
 * - "/local/path/https:/domain.com" (mezcladas)
 */
function cleanMalformedUrl(path: string): string {
  // Si contiene "supabase.co" pero no empieza con http
  if (path.includes('supabase.co') && !isFullUrl(path)) {
    // Extraer solo la parte de Supabase
    const match = path.match(/(https?:\/)?\/.*supabase\.co.*/)
    if (match) {
      let url = match[0]
      // Arreglar https:/ a https://
      url = url.replace(/^https?:\/([^/])/, 'https://$1')
      return url
    }
  }
  return path
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
 * Convierte una ruta de imagen a URL completa.
 * 
 * ESTRATEGIA SIMPLE:
 * - Si la ruta tiene carpetas (implementos/, repuestos/) → Supabase Storage
 * - Si es URL completa → retornar tal cual
 * - Si empieza con / → ruta local
 * - Si es solo nombre → placeholder (no debería pasar)
 * 
 * @param imagePath - Ruta de la imagen
 * @param productType - Tipo de producto (no usado, mantenido por compatibilidad)
 * @param isNew - Si es nuevo o usado (no usado, mantenido por compatibilidad)
 * @returns URL completa de la imagen
 */
export function getImageUrl(
  imagePath: string | null | undefined,
  productType?: ProductType,
  isNew?: boolean
): string {
  // Sin imagen → placeholder
  if (!imagePath) return PLACEHOLDER_IMAGE

  // URL completa (http/https) → usar tal cual
  if (isFullUrl(imagePath)) return imagePath

  // Ruta absoluta local (/...) → usar tal cual
  if (imagePath.startsWith('/')) return imagePath

  // Ruta con public/ → convertir a absoluta
  if (imagePath.startsWith('public/')) return `/${imagePath}`

  // Ruta con estructura de carpetas (implementos/nuevos/, repuestos/, etc)
  // → CARGAR DESDE SUPABASE
  if (hasFolder(imagePath)) {
    const supabaseUrl = buildSupabaseUrl(imagePath)
    return supabaseUrl || PLACEHOLDER_IMAGE
  }

  // Solo nombre de archivo sin carpetas → placeholder
  // (esto no debería pasar si la BD está bien)
  return PLACEHOLDER_IMAGE
}

/**
 * Obtiene la URL de Supabase Storage para una imagen (para fallback)
 * Convierte cualquier ruta (local, relativa, etc) a URL de Supabase
 * @param imagePath - Ruta de la imagen
 * @returns URL de Supabase Storage
 */
export function getSupabaseImageUrl(imagePath: string): string {
  console.log('[getSupabaseImageUrl] INPUT:', imagePath)
  
  if (!imagePath) return PLACEHOLDER_IMAGE

  // Limpiar URLs malformadas
  const cleanedPath = cleanMalformedUrl(imagePath)
  console.log('[getSupabaseImageUrl] CLEANED:', cleanedPath)

  // Si ya es una URL completa de Supabase, retornarla
  if (isFullUrl(cleanedPath) && cleanedPath.includes('supabase.co')) {
    console.log('[getSupabaseImageUrl] Already Supabase URL')
    return cleanedPath
  }

  // Si es una URL completa pero NO de Supabase, no podemos convertirla
  if (isFullUrl(cleanedPath)) {
    console.log('[getSupabaseImageUrl] External URL, returning placeholder')
    return PLACEHOLDER_IMAGE
  }

  // Extraer solo la parte relativa (quitar /images/products/ si existe)
  let relativePath = cleanedPath
    .replace(/^\/images\/products\//, '')  // Quitar prefijo local
    .replace(/^\//, '')                      // Quitar / inicial si queda
    .replace(/^public\//, '')                // Quitar public/ si existe
  
  console.log('[getSupabaseImageUrl] RELATIVE PATH:', relativePath)
  console.log('[getSupabaseImageUrl] HAS FOLDER:', hasFolder(relativePath))

  // Si ya tiene la estructura de carpetas correcta, usarla directamente
  // Esto evita duplicación de carpetas
  if (hasFolder(relativePath)) {
    const supabaseUrl = buildSupabaseUrl(relativePath)
    console.log('[getSupabaseImageUrl] FINAL URL:', supabaseUrl)
    return supabaseUrl || PLACEHOLDER_IMAGE
  }

  // Si no tiene carpeta, no podemos saber dónde buscar
  // Retornar placeholder (no intentar adivinar)
  console.log('[getSupabaseImageUrl] No folder found, returning placeholder')
  return PLACEHOLDER_IMAGE
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

