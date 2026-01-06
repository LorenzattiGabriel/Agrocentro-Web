"use client"

import { useState } from "react"
import { getImageUrl, getSupabaseImageUrl } from "@/lib/utils/images"

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  loading?: "lazy" | "eager"
  onError?: () => void
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
  onError 
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(getImageUrl(src))
  const [attemptCount, setAttemptCount] = useState(0)

  const handleError = () => {
    if (attemptCount === 0) {
      // Primer fallo (local), intentar Supabase
      const supabaseUrl = getSupabaseImageUrl(src || '')
      if (supabaseUrl !== currentSrc && supabaseUrl !== '/placeholder.svg') {
        setAttemptCount(1)
        setCurrentSrc(supabaseUrl)
        return
      }
    }

    // Segundo fallo o no hay URL de Supabase válida, mostrar placeholder
    setCurrentSrc('/placeholder.svg')
    onError?.()
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  )
}

