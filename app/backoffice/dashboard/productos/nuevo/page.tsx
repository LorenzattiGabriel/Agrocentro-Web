"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function NuevoProductoPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
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
  const [imagenes, setImagenes] = useState<File[]>([])
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setImagenes(prev => [...prev, ...validFiles])

    // Crear previews
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenesPreview(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImagenes(prev => prev.filter((_, i) => i !== index))
    setImagenesPreview(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (imagenes.length === 0) return []

    setUploadingImages(true)
    const uploadedPaths: string[] = []

    try {
      for (const file of imagenes) {
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
    setLoading(true)
    setError("")

    try {
      // Validaciones
      if (!nombre || !marca) {
        throw new Error("Nombre y marca son obligatorios")
      }

      // Subir imágenes
      const imagesPaths = await uploadImages()

      // Preparar datos base
      const productoDataBase = {
        nombre,
        marca,
        modelo: modelo || null,
        categoria: categoria || null,
        descripcion: descripcion || null,
        ids_imagenes: imagesPaths,
      }

      // Agregar campos específicos según el tipo
      const productoData = tipo === 'implemento'
        ? { ...productoDataBase, esNuevo: estado === 'nuevo' }  // Solo implementos tienen esNuevo
        : productoDataBase  // Repuestos NO tienen esNuevo

      // Insertar en la tabla correspondiente
      const table = tipo === 'implemento' ? 'implementos' : 'repuestos'
      const { data, error } = await supabase
        .from(table)
        .insert([productoData])
        .select()

      if (error) throw error

      // Redirigir al listado
      router.push('/backoffice/dashboard/productos')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/backoffice/dashboard/productos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nuevo Producto</h1>
          <p className="text-muted-foreground mt-2">
            Agrega un nuevo implemento o repuesto al catálogo
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de producto */}
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Producto</CardTitle>
            <CardDescription>
              Selecciona si es un implemento o un repuesto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="implemento"
                  checked={tipo === 'implemento'}
                  onChange={(e) => setTipo(e.target.value as 'implemento')}
                  className="w-4 h-4"
                />
                <span>Implemento</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="repuesto"
                  checked={tipo === 'repuesto'}
                  onChange={(e) => setTipo(e.target.value as 'repuesto')}
                  className="w-4 h-4"
                />
                <span>Repuesto</span>
              </label>
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
                  placeholder="Ej: Sembradora de precisión"
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
                  placeholder="Ej: John Deere"
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
                  placeholder="Ej: XYZ-2000"
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
                  placeholder="Ej: Sembradoras"
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
                    {estado === 'nuevo' ? 'Se guardará en: implementos/nuevos/' : 'Se guardará en: implementos/usados/'}
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
                placeholder="Descripción detallada del producto..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
            <CardDescription>
              Sube hasta 10 imágenes del producto (máx 5MB cada una)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Preview de imágenes */}
            {imagenesPreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagenesPreview.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input de archivo */}
            <div>
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Haz clic para seleccionar imágenes
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP hasta 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={imagenes.length >= 10}
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Botones */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading || uploadingImages}
          >
            {loading ? "Guardando..." : uploadingImages ? "Subiendo imágenes..." : "Guardar Producto"}
          </Button>
          <Link href="/backoffice/dashboard/productos">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

