import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { ProductosList } from "@/components/admin/ProductosList"

export const dynamic = 'force-dynamic'

export default async function ProductosPage() {
  const supabase = await createClient()

  // Obtener todos los productos
  const [
    { data: implementos },
    { data: repuestos },
  ] = await Promise.all([
    supabase.from("implementos").select("*").order("created_at", { ascending: false }),
    supabase.from("repuestos").select("*").order("created_at", { ascending: false }),
  ])

  // Combinar y agregar tipo
  const todosLosProductos = [
    ...(implementos || []).map(p => ({ ...p, tipo: 'implemento' as const })),
    ...(repuestos || []).map(p => ({ ...p, tipo: 'repuesto' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu catálogo de implementos y repuestos
          </p>
        </div>
        <Link href="/backoffice/dashboard/productos/nuevo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todosLosProductos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Implementos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{implementos?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Repuestos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repuestos?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductosList productos={todosLosProductos} />
        </CardContent>
      </Card>
    </div>
  )
}

