"use client"

import { useState } from "react"
import { getImageUrl, getLocalImageUrl } from "@/lib/utils/images"

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  loading?: "lazy" | "eager"
  onError?: () => void
}

/**
 * Componente de imagen con fallback automático:
 * 1. Intenta cargar desde Supabase Storage
 * 2. Si falla, intenta desde /images/products/ local
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
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (hasError) {
      // Ya probamos el fallback, mostrar placeholder
      setCurrentSrc('/placeholder.svg')
      return
    }

    // Intentar con la ruta local
    const localUrl = getLocalImageUrl(src || '')
    if (localUrl !== currentSrc) {
      setHasError(true)
      setCurrentSrc(localUrl)
    } else {
      // Si la URL local es igual a la actual, ir directo al placeholder
      setCurrentSrc('/placeholder.svg')
    }

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

