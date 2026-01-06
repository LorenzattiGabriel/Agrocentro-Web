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

  // Limpiar URLs malformadas
  const cleanedPath = cleanMalformedUrl(imagePath)

  // Casos directos (sin procesamiento)
  if (isFullUrl(cleanedPath)) return cleanedPath
  if (cleanedPath.startsWith('/')) return cleanedPath
  if (cleanedPath.startsWith('public/')) return `/${cleanedPath}`

  // Extraer nombre de archivo
  const fileName = cleanedPath.split('/').pop() || cleanedPath
  const isNewImg = isNewImage(fileName)

  // CASO 1: Ruta ya tiene carpetas (implementos/nuevos/imagen.png)
  if (hasFolder(cleanedPath)) {
    if (isNewImg) {
      const supabaseUrl = buildSupabaseUrl(cleanedPath)
      if (supabaseUrl) return supabaseUrl
    }
    return buildLocalUrl(cleanedPath)
  }

  // CASO 2: Solo nombre de archivo - necesita carpeta
  const folder = productType ? buildFolder(productType, isNew) : 'implementos/nuevos'
  const fullPath = `${folder}/${cleanedPath}`

  if (isNewImg) {
    const supabaseUrl = buildSupabaseUrl(fullPath)
    if (supabaseUrl) return supabaseUrl
  }

  return buildLocalUrl(fullPath)
}

/**
 * Obtiene la URL de Supabase Storage para una imagen (para fallback)
 * Convierte cualquier ruta (local, relativa, etc) a URL de Supabase
 * @param imagePath - Ruta de la imagen
 * @returns URL de Supabase Storage
 */
export function getSupabaseImageUrl(imagePath: string): string {
  if (!imagePath) return PLACEHOLDER_IMAGE

  // Limpiar URLs malformadas
  const cleanedPath = cleanMalformedUrl(imagePath)

  // Si ya es una URL completa de Supabase, retornarla
  if (isFullUrl(cleanedPath) && cleanedPath.includes('supabase.co')) {
    return cleanedPath
  }

  // Si es una URL completa pero NO de Supabase, no podemos convertirla
  if (isFullUrl(cleanedPath)) {
    return PLACEHOLDER_IMAGE
  }

  // Extraer solo la parte relativa (quitar /images/products/ si existe)
  let relativePath = cleanedPath
    .replace(/^\/images\/products\//, '')  // Quitar prefijo local
    .replace(/^\//, '')                      // Quitar / inicial si queda
    .replace(/^public\//, '')                // Quitar public/ si existe

  // Si no tiene carpeta y no es una ruta válida, no podemos convertirla
  if (!relativePath || relativePath === cleanedPath.replace(/^\//, '')) {
    // Intentar con lo que tengamos
  }

  // Construir URL de Supabase
  const supabaseUrl = buildSupabaseUrl(relativePath)
  return supabaseUrl || PLACEHOLDER_IMAGE
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

