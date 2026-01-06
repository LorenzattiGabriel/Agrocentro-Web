"use client"

import { useState, useEffect } from "react"
import { getImageUrl } from "@/lib/utils/images"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  loading?: "lazy" | "eager"
  onError?: () => void
  productType?: 'implementos' | 'repuestos'
  isNew?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Componente de imagen simplificado:
 * 
 * 1. Obtiene la URL correcta con getImageUrl
 * 2. Si falla al cargar → muestra placeholder
 * 3. Sin fallbacks complicados
 * 
 * @example
 * ```tsx
 * <ProductImage 
 *   src="implementos/nuevos/imagen.png" 
 *   alt="Producto"
 * />
 * ```
 */
export default function ProductImage({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  onError,
  productType,
  isNew
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(
    getImageUrl(src, productType, isNew)
  )
  const [hasError, setHasError] = useState(false)

  // Reset state when source changes
  useEffect(() => {
    const newSrc = getImageUrl(src, productType, isNew)
    setCurrentSrc(newSrc)
    setHasError(false)
  }, [src, productType, isNew])

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true)
      setCurrentSrc('/placeholder.svg')
      onError?.()
    }
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleImageError}
    />
  )
}

