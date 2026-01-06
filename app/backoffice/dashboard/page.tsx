import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Image as ImageIcon, AlertCircle, TrendingUp, Layers } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Obtener estadísticas básicas
  const [
    { count: implementosCount },
    { count: repuestosCount },
    { data: user },
  ] = await Promise.all([
    supabase.from("implementos").select("*", { count: "exact", head: true }),
    supabase.from("repuestos").select("*", { count: "exact", head: true }),
    supabase.auth.getUser(),
  ])

  // Obtener datos detallados
  const [
    { data: implementos },
    { data: repuestos },
  ] = await Promise.all([
    supabase.from("implementos").select("*"),
    supabase.from("repuestos").select("*"),
  ])

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user?.user?.id)
    .single()

  const totalProductos = (implementosCount || 0) + (repuestosCount || 0)

  // Calcular métricas avanzadas
  const implementosNuevos = implementos?.filter(p => p.esNuevo === true).length || 0
  const implementosUsados = implementos?.filter(p => p.esNuevo === false).length || 0
  
  const productosSinImagenes = [
    ...(implementos || []),
    ...(repuestos || [])
  ].filter(p => !p.ids_imagenes || p.ids_imagenes.length === 0).length

  const productosConImagenes = totalProductos - productosSinImagenes

  // Agrupar por categoría
  const categorias = [...(implementos || []), ...(repuestos || [])]
    .reduce((acc: any, p) => {
      const cat = p.categoria || 'Sin categoría'
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {})

  const topCategorias = Object.entries(categorias)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5)

  // Agrupar por marca
  const marcas = [...(implementos || []), ...(repuestos || [])]
    .reduce((acc: any, p) => {
      const marca = p.marca || 'Sin marca'
      acc[marca] = (acc[marca] || 0) + 1
      return acc
    }, {})

  const topMarcas = Object.entries(marcas)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 5)

  // Productos agregados recientemente (últimos 7 días)
  const hace7Dias = new Date()
  hace7Dias.setDate(hace7Dias.getDate() - 7)
  
  const productosRecientes = [...(implementos || []), ...(repuestos || [])]
    .filter(p => {
      const createdAt = new Date(p.created_at)
      return createdAt >= hace7Dias
    }).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido, {profile?.full_name || profile?.email || "Admin"}
        </p>
      </div>

      {/* Stats Cards Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              {implementosCount} implementos, {repuestosCount} repuestos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Implementos
            </CardTitle>
            <Layers className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{implementosCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {implementosNuevos} nuevos, {implementosUsados} usados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Con Imágenes
            </CardTitle>
            <ImageIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{productosConImagenes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((productosConImagenes / totalProductos) * 100).toFixed(1)}% del catálogo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Agregados (7d)
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{productosRecientes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 7 días
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas y Avisos */}
      {productosSinImagenes > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">Atención Requerida</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800">
              <strong>{productosSinImagenes} productos</strong> no tienen imágenes asignadas. 
              Considera agregar imágenes para mejorar la experiencia de los usuarios.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Métricas Detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categorías */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Categorías</CardTitle>
            <CardDescription>Productos por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategorias.map(([categoria, count]: any, index) => (
                <div key={categoria} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{categoria}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(count / totalProductos) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Marcas */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Marcas</CardTitle>
            <CardDescription>Productos por marca</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMarcas.map(([marca, count]: any, index) => (
                <div key={marca} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-medium text-green-700">
                      {index + 1}
                    </div>
                    <span className="font-medium">{marca}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600 rounded-full" 
                        style={{ width: `${(count / totalProductos) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
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
            href="/backoffice/dashboard/productos/nuevo"
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
            href="/backoffice/dashboard/productos"
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

