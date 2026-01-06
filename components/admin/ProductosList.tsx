"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
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
  esNuevo?: boolean
  created_at: string
}

export function ProductosList({ productos }: { productos: Producto[] }) {
  const [filter, setFilter] = useState<'all' | 'implemento' | 'repuesto'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoria, setSelectedCategoria] = useState<string>('all')
  const [selectedMarca, setSelectedMarca] = useState<string>('all')
  const [selectedEstado, setSelectedEstado] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Extraer categorías y marcas únicas
  const categorias = useMemo(() => {
    const cats = new Set(productos.map(p => p.categoria || 'Sin categoría'))
    return Array.from(cats).sort()
  }, [productos])

  const marcas = useMemo(() => {
    const mrcs = new Set(productos.map(p => p.marca || 'Sin marca'))
    return Array.from(mrcs).sort()
  }, [productos])

  // Filtrar productos
  const filteredProductos = useMemo(() => {
    return productos.filter(p => {
      const matchesTipo = filter === 'all' || p.tipo === filter
      const matchesSearch = 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      const matchesCategoria = selectedCategoria === 'all' || (p.categoria || 'Sin categoría') === selectedCategoria
      const matchesMarca = selectedMarca === 'all' || (p.marca || 'Sin marca') === selectedMarca
      const matchesEstado = selectedEstado === 'all' || 
        (selectedEstado === 'nuevo' && p.esNuevo === true) ||
        (selectedEstado === 'usado' && p.esNuevo === false)
      
      return matchesTipo && matchesSearch && matchesCategoria && matchesMarca && matchesEstado
    })
  }, [productos, filter, searchTerm, selectedCategoria, selectedMarca, selectedEstado])

  // Paginación
  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProductos = filteredProductos.slice(startIndex, endIndex)

  // Reset page when filters change
  const handleFilterChange = (callback: () => void) => {
    callback()
    setCurrentPage(1)
  }

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
      {/* Búsqueda */}
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, marca o modelo..."
          value={searchTerm}
          onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Filtro Tipo */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Tipo</label>
          <select
            value={filter}
            onChange={(e) => handleFilterChange(() => setFilter(e.target.value as any))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">Todos</option>
            <option value="implemento">Implementos</option>
            <option value="repuesto">Repuestos</option>
          </select>
        </div>

        {/* Filtro Categoría */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Categoría</label>
          <select
            value={selectedCategoria}
            onChange={(e) => handleFilterChange(() => setSelectedCategoria(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">Todas ({categorias.length})</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Filtro Marca */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Marca</label>
          <select
            value={selectedMarca}
            onChange={(e) => handleFilterChange(() => setSelectedMarca(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">Todas ({marcas.length})</option>
            {marcas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>

        {/* Filtro Estado (solo para implementos) */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Estado</label>
          <select
            value={selectedEstado}
            onChange={(e) => handleFilterChange(() => setSelectedEstado(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="all">Todos</option>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>

        {/* Items por página */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Por página</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {/* Botón limpiar filtros */}
      {(searchTerm || filter !== 'all' || selectedCategoria !== 'all' || selectedMarca !== 'all' || selectedEstado !== 'all') && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('')
              setFilter('all')
              setSelectedCategoria('all')
              setSelectedMarca('all')
              setSelectedEstado('all')
              setCurrentPage(1)
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

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
            {paginatedProductos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              paginatedProductos.map((producto) => (
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
                    {producto.esNuevo !== undefined && (
                      <Badge variant={producto.esNuevo ? "default" : "outline"}>
                        {producto.esNuevo ? 'Nuevo' : 'Usado'}
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

      {/* Paginación y resultados */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProductos.length)} de {filteredProductos.length} productos
          {filteredProductos.length !== productos.length && ` (filtrados de ${productos.length} totales)`}
        </div>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Mostrar primera, última, actual y 2 adyacentes
                  return page === 1 || 
                         page === totalPages || 
                         Math.abs(page - currentPage) <= 1
                })
                .map((page, index, array) => {
                  // Agregar "..." si hay saltos
                  const prevPage = array[index - 1]
                  const showEllipsis = prevPage && page - prevPage > 1

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && <span className="px-2 text-gray-400">...</span>}
                      <Button
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    </div>
                  )
                })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

