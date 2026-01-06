"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import ProductImage from "@/components/ProductImage"

export default function EditarProductoPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [tipo, setTipo] = useState<'implemento' | 'repuesto'>('implemento')
  const [nombre, setNombre] = useState("")
  const [marca, setMarca] = useState("")
  const [modelo, setModelo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [estado, setEstado] = useState<'nuevo' | 'usado'>('nuevo')
  const [descripcion, setDescripcion] = useState("")
  const [imagenesExistentes, setImagenesExistentes] = useState<string[]>([])
  const [nuevasImagenes, setNuevasImagenes] = useState<File[]>([])
  const [nuevasImagenesPreview, setNuevasImagenesPreview] = useState<string[]>([])

  // Cargar datos del producto
  useEffect(() => {
    const loadProducto = async () => {
      try {
        // Intentar cargar desde implementos
        let { data, error } = await supabase
          .from("implementos")
          .select("*")
          .eq("id", productId)
          .single()

        let tipoProducto: 'implemento' | 'repuesto' = 'implemento'

        // Si no está en implementos, intentar en repuestos
        if (error || !data) {
          const result = await supabase
            .from("repuestos")
            .select("*")
            .eq("id", productId)
            .single()
          
          data = result.data
          error = result.error
          tipoProducto = 'repuesto'
        }

        if (error || !data) {
          throw new Error("Producto no encontrado")
        }

        // Llenar el formulario
        setTipo(tipoProducto)
        setNombre(data.nombre || "")
        setMarca(data.marca || "")
        setModelo(data.modelo || "")
        setCategoria(data.categoria || "")
        setEstado(data.esNuevo ? 'nuevo' : 'usado')
        setDescripcion(data.descripcion || "")
        setImagenesExistentes(data.ids_imagenes || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducto()
  }, [productId, supabase])

  const getImageUrl = (path: string) => {
    if (!path) return '/placeholder.svg'
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    if (path.startsWith('/')) return path
    
    // Intentar Supabase Storage primero
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabaseUrl) {
      return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`
    }
    
    // Fallback a local
    return `/images/products/${path}`
  }

  const handleNuevasImagenesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Validar tipo y tamaño
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} es muy grande (máx 5MB)`)
        return false
      }
      return true
    })

    setNuevasImagenes(prev => [...prev, ...validFiles])

    // Crear previews
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNuevasImagenesPreview(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeExistingImage = (index: number) => {
    setImagenesExistentes(prev => prev.filter((_, i) => i !== index))
  }

  const removeNewImage = (index: number) => {
    setNuevasImagenes(prev => prev.filter((_, i) => i !== index))
    setNuevasImagenesPreview(prev => prev.filter((_, i) => i !== index))
  }

  const uploadNewImages = async (): Promise<string[]> => {
    if (nuevasImagenes.length === 0) return []

    setUploadingImages(true)
    const uploadedPaths: string[] = []

    try {
      for (const file of nuevasImagenes) {
        // Generar nombre único
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(7)
        const sanitizedName = file.name
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9.-]/g, '')
          .toLowerCase()
        const fileName = `${timestamp}-${randomStr}-${sanitizedName}`
        
        // Determinar la ruta según el tipo y estado
        let filePath: string
        if (tipo === 'implemento') {
          filePath = `implementos/${estado}/${fileName}`
        } else {
          filePath = `repuestos/${fileName}`
        }

        // Subir a Supabase Storage
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          })

        if (error) throw error

        uploadedPaths.push(filePath)
      }

      return uploadedPaths
    } catch (err: any) {
      throw new Error(`Error subiendo imágenes: ${err.message}`)
    } finally {
      setUploadingImages(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      // Validaciones
      if (!nombre || !marca) {
        throw new Error("Nombre y marca son obligatorios")
      }

      // Subir nuevas imágenes
      const newImagesPaths = await uploadNewImages()

      // Combinar imágenes existentes con las nuevas
      const allImages = [...imagenesExistentes, ...newImagesPaths]

      // Preparar datos
      const productoData = {
        nombre,
        marca,
        modelo: modelo || null,
        categoria: categoria || null,
        descripcion: descripcion || null,
        esNuevo: estado === 'nuevo',
        ids_imagenes: allImages,
      }

      // Actualizar en la tabla correspondiente
      const table = tipo === 'implemento' ? 'implementos' : 'repuestos'
      const { error } = await supabase
        .from(table)
        .update(productoData)
        .eq('id', productId)

      if (error) throw error

      // Redirigir al listado
      router.push('/admin/dashboard/productos')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error && !nombre) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/admin/dashboard/productos">
            <Button>Volver al listado</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/productos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Editar Producto</h1>
          <p className="text-muted-foreground mt-2">
            Modifica la información del producto
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de producto (solo lectura) */}
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Producto</CardTitle>
            <CardDescription>
              El tipo no puede modificarse después de crear el producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="px-4 py-2 bg-gray-100 rounded-md inline-block">
              {tipo === 'implemento' ? 'Implemento' : 'Repuesto'}
            </div>
          </CardContent>
        </Card>

        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Marca <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Modelo
                </label>
                <input
                  type="text"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoría
                </label>
                <input
                  type="text"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {tipo === 'implemento' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as 'nuevo' | 'usado')}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Las nuevas imágenes se guardarán en: implementos/{estado}/
                  </p>
                </div>
              )}

            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
            <CardDescription>
              Gestiona las imágenes del producto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Imágenes existentes */}
            {imagenesExistentes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Imágenes actuales</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagenesExistentes.map((imagen, index) => (
                    <div key={index} className="relative aspect-square">
                      <ProductImage
                        src={imagen}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="eager"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nuevas imágenes */}
            {nuevasImagenesPreview.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Nuevas imágenes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {nuevasImagenesPreview.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={preview}
                        alt={`Nueva ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input de archivo */}
            <div>
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Agregar más imágenes
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP hasta 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNuevasImagenesChange}
                  className="hidden"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Botones */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={saving || uploadingImages}
          >
            {saving ? "Guardando..." : uploadingImages ? "Subiendo imágenes..." : "Guardar Cambios"}
          </Button>
          <Link href="/admin/dashboard/productos">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

