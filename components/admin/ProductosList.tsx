"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import ProductImage from "@/components/ProductImage"
import Link from "next/link"

type Producto = {
  id: string
  nombre: string
  marca: string
  modelo?: string
  precio?: number
  ids_imagenes: string[]
  tipo: 'implemento' | 'repuesto'
  categoria?: string
  estado?: string
  created_at: string
}

export function ProductosList({ productos }: { productos: Producto[] }) {
  const [filter, setFilter] = useState<'all' | 'implemento' | 'repuesto'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const filteredProductos = productos.filter(p => {
    const matchesFilter = filter === 'all' || p.tipo === filter
    const matchesSearch = 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    return matchesFilter && matchesSearch
  })

  const handleDelete = async (id: string, tipo: 'implemento' | 'repuesto') => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    setDeleting(id)
    try {
      const table = tipo === 'implemento' ? 'implementos' : 'repuestos'
      const { error } = await supabase.from(table).delete().eq('id', id)

      if (error) throw error

      router.refresh()
    } catch (error: any) {
      alert('Error al eliminar: ' + error.message)
    } finally {
      setDeleting(null)
    }
  }

  const getFirstImage = (ids: string[]) => {
    if (!ids || ids.length === 0) return null
    return ids[0]
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre, marca o modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={filter === 'implemento' ? 'default' : 'outline'}
            onClick={() => setFilter('implemento')}
            size="sm"
          >
            Implementos
          </Button>
          <Button
            variant={filter === 'repuesto' ? 'default' : 'outline'}
            onClick={() => setFilter('repuesto')}
            size="sm"
          >
            Repuestos
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Producto</th>
              <th className="text-left py-3 px-4">Tipo</th>
              <th className="text-left py-3 px-4">Marca/Modelo</th>
              <th className="text-left py-3 px-4">Estado</th>
              <th className="text-right py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              filteredProductos.map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={getFirstImage(producto.ids_imagenes)}
                        alt={producto.nombre}
                        className="w-12 h-12 object-cover rounded"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-medium">{producto.nombre}</div>
                        {producto.categoria && (
                          <div className="text-sm text-muted-foreground">
                            {producto.categoria}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={producto.tipo === 'implemento' ? 'default' : 'secondary'}>
                      {producto.tipo}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{producto.marca}</div>
                      {producto.modelo && (
                        <div className="text-sm text-muted-foreground">
                          {producto.modelo}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {producto.estado && (
                      <Badge variant="outline">
                        {producto.estado}
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${producto.tipo === 'implemento' ? 'implementos-nuevos' : 'repuestos'}/${producto.id}`}
                        target="_blank"
                      >
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/backoffice/dashboard/productos/${producto.id}/editar`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(producto.id, producto.tipo)}
                        disabled={deleting === producto.id}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Mostrando {filteredProductos.length} de {productos.length} productos
      </div>
    </div>
  )
}

