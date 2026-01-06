export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // El layout principal de /backoffice no debe proteger rutas
  // La protección se hace en el layout de /backoffice/dashboard
  return <>{children}</>
}

