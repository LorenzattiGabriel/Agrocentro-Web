import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Image as ImageIcon, Users } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Obtener estadísticas
  const [
    { count: implementosCount },
    { count: repuestosCount },
    { data: user },
  ] = await Promise.all([
    supabase.from("implementos").select("*", { count: "exact", head: true }),
    supabase.from("repuestos").select("*", { count: "exact", head: true }),
    supabase.auth.getUser(),
  ])

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user?.user?.id)
    .single()

  const totalProductos = (implementosCount || 0) + (repuestosCount || 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido, {profile?.full_name || profile?.email || "Admin"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Productos
            </CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProductos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Implementos y repuestos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Implementos
            </CardTitle>
            <Package className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{implementosCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Nuevos y usados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Repuestos
            </CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{repuestosCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Piezas y componentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Gestiona tu catálogo de productos
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/dashboard/productos/nuevo"
            className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Agregar Producto</h3>
              <p className="text-sm text-muted-foreground">
                Crear nuevo implemento o repuesto
              </p>
            </div>
          </a>

          <a
            href="/admin/dashboard/productos"
            className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Ver Productos</h3>
              <p className="text-sm text-muted-foreground">
                Listar y editar catálogo
              </p>
            </div>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

