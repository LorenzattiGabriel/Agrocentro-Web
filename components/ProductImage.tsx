"use client"

import { useState, useEffect } from "react"
import { getImageUrl, getSupabaseImageUrl } from "@/lib/utils/images"

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

enum LoadAttempt {
  LOCAL = 0,
  SUPABASE = 1,
  FAILED = 2
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Componente de imagen con fallback inteligente:
 * 
 * Estrategia de carga:
 * 1. Intenta la URL principal (local o Supabase según contexto)
 * 2. Si falla, intenta Supabase Storage como fallback
 * 3. Si todo falla, muestra placeholder
 * 
 * @example
 * ```tsx
 * <ProductImage 
 *   src="imagen.png" 
 *   alt="Producto" 
 *   productType="implementos"
 *   isNew={true}
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
  const [attemptCount, setAttemptCount] = useState<LoadAttempt>(LoadAttempt.LOCAL)

  // Reset state when source changes
  useEffect(() => {
    const newSrc = getImageUrl(src, productType, isNew)
    setCurrentSrc(newSrc)
    setAttemptCount(LoadAttempt.LOCAL)
  }, [src, productType, isNew])

  const handleImageError = () => {
    // Primera falla: intentar Supabase como fallback
    if (attemptCount === LoadAttempt.LOCAL) {
      const supabaseUrl = getSupabaseImageUrl(src || '')
      
      if (supabaseUrl && supabaseUrl !== currentSrc && supabaseUrl !== '/placeholder.svg') {
        setAttemptCount(LoadAttempt.SUPABASE)
        setCurrentSrc(supabaseUrl)
        return
      }
    }

    // Segunda falla o sin alternativas: mostrar placeholder
    setAttemptCount(LoadAttempt.FAILED)
    setCurrentSrc('/placeholder.svg')
    onError?.()
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

