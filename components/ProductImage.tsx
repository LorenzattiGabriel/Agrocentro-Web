"use client"

import { useState, useEffect } from "react"
import { getImageUrl, getSupabaseImageUrl } from "@/lib/utils/images"

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  loading?: "lazy" | "eager"
  onError?: () => void
  productType?: 'implementos' | 'repuestos'
  isNew?: boolean
}

/**
 * Componente de imagen con fallback automático OPTIMIZADO:
 * 1. Intenta cargar desde /images/products/ LOCAL (más rápido)
 * 2. Si falla, intenta desde Supabase Storage
 * 3. Si falla, muestra /placeholder.svg
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
  const [currentSrc, setCurrentSrc] = useState<string>(getImageUrl(src, productType, isNew))
  const [attemptCount, setAttemptCount] = useState(0)
  const [hasError, setHasError] = useState(false)

  // Reset when src changes
  useEffect(() => {
    const newSrc = getImageUrl(src, productType, isNew)
    setCurrentSrc(newSrc)
    setAttemptCount(0)
    setHasError(false)
  }, [src, productType, isNew])

  const handleError = () => {
    console.log('[ProductImage] Error loading:', currentSrc, 'Attempt:', attemptCount)
    
    if (attemptCount === 0) {
      // Primer fallo (local), intentar Supabase
      const supabaseUrl = getSupabaseImageUrl(src || '')
      console.log('[ProductImage] Trying Supabase:', supabaseUrl)
      
      if (supabaseUrl !== currentSrc && supabaseUrl !== '/placeholder.svg') {
        setAttemptCount(1)
        setCurrentSrc(supabaseUrl)
        return
      }
    }

    // Segundo fallo o no hay URL de Supabase válida, mostrar placeholder
    console.log('[ProductImage] All attempts failed, showing placeholder')
    setCurrentSrc('/placeholder.svg')
    setHasError(true)
    onError?.()
  }

  const handleLoad = () => {
    if (attemptCount > 0 || hasError) {
      console.log('[ProductImage] Successfully loaded:', currentSrc, 'after', attemptCount, 'attempts')
    }
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}

