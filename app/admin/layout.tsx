export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // El layout principal de /admin no debe proteger rutas
  // La protección se hace en el layout de /admin/dashboard
  return <>{children}</>
}

