# 🚀 Backoffice - Agrocentro Web

Sistema de gestión de catálogo con autenticación y almacenamiento en Supabase.

## 📋 Características Implementadas

✅ **Autenticación de Usuarios**
- Login seguro con Supabase Auth
- Roles de administrador (admin y super_admin)
- Protección de rutas con middleware

✅ **Gestión de Productos**
- Listado completo de implementos y repuestos
- Agregar nuevos productos con imágenes
- Editar productos existentes
- Eliminar productos
- Búsqueda y filtros

✅ **Almacenamiento de Imágenes**
- Imágenes almacenadas en Supabase Storage
- Bucket público `product-images`
- Migración automática desde archivos locales

---

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Ya configuradas en tu archivo `.env` local:

```env
# Database (ya configuradas)
DATABASE_URL="postgresql://postgres.zyybiudqmvxmvwqaveex:admin1234@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.zyybiudqmvxmvwqaveex:admin1234@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# Supabase (ya configuradas)
NEXT_PUBLIC_SUPABASE_URL="https://zyybiudqmvxmvwqaveex.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 2. Configurar en Vercel

⚠️ **IMPORTANTE**: Debes agregar estas 2 nuevas variables en Vercel:

1. Ve a tu proyecto en **Vercel Dashboard**
2. Settings → Environment Variables
3. Agrega las siguientes:

```
NEXT_PUBLIC_SUPABASE_URL = https://zyybiudqmvxmvwqaveex.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eWJpdWRxbXZ4bXZ3cWF2ZWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3Mjg0NzcsImV4cCI6MjA3NTMwNDQ3N30.MrTFOpXDhu4wCtei5AVmP3kW4-Q-OXH6pyfCaHRSPYU
```

4. Las variables `DATABASE_URL` y `DIRECT_URL` ya las tienes configuradas
5. Haz un nuevo deploy después de agregar las variables

### 3. Crear Primer Usuario Admin

Para crear tu primer usuario administrador:

1. Ve a **Supabase Dashboard**
2. Navega a **Authentication** → **Users**
3. Haz clic en **"Add user"** → **"Create new user"**
4. Completa:
   - Email: `tu-email@ejemplo.com`
   - Password: (genera una contraseña segura)
   - ✅ **Auto Confirm User** (actívalo)
5. Haz clic en **"Create user"**

6. Ahora ve a **SQL Editor** y ejecuta:

```sql
UPDATE public.admin_profiles 
SET role = 'super_admin' 
WHERE email = 'tu-email@ejemplo.com';
```

---

## 🎯 Uso del Backoffice

### Acceso

**URL**: `https://tu-dominio.com/admin/login`

o localmente: `http://localhost:3000/admin/login`

### Funcionalidades

#### 📊 Dashboard
- Vista general de estadísticas
- Accesos rápidos a funciones principales

#### 📦 Gestión de Productos

**Listar Productos**
- `/admin/dashboard/productos`
- Filtros por tipo (implemento/repuesto)
- Búsqueda por nombre, marca o modelo
- Ver, editar o eliminar productos

**Agregar Producto**
- `/admin/dashboard/productos/nuevo`
- Seleccionar tipo (implemento/repuesto)
- Completar información básica
- Subir hasta 10 imágenes (máx 5MB cada una)

**Editar Producto**
- Click en el botón de editar desde el listado
- Modificar información
- Agregar o eliminar imágenes
- Las imágenes se mantienen en Supabase Storage

---

## 🗂️ Estructura de Archivos

```
/app/admin/
  /login/                    # Página de login
  /dashboard/                # Panel principal
    /productos/              # Gestión de productos
      /nuevo/                # Agregar producto
      /[id]/editar/          # Editar producto
  layout.tsx                 # Layout protegido

/components/admin/
  ProductosList.tsx          # Componente de listado

/lib/
  /supabase/
    client.ts                # Cliente browser
    server.ts                # Cliente servidor
    middleware.ts            # Middleware de sesión
  /utils/
    images.ts                # Helpers de imágenes

/scripts/
  setup-auth.sql             # SQL para configurar auth
  setup-storage.sql          # SQL para configurar storage
  migrate-images-to-storage.ts  # Script de migración

middleware.ts                # Middleware de Next.js
```

---

## 🔄 Scripts Útiles

### Migrar Imágenes a Supabase Storage

Si necesitas volver a migrar imágenes:

```bash
npm run migrate:images
```

### Sincronizar JSON con Base de Datos

Si actualizas los archivos JSON locales:

```bash
npm run seed
```

---

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Acceder al backoffice
# http://localhost:3000/admin/login
```

---

## 🌐 URLs del Sistema

| Función | URL |
|---------|-----|
| **Login** | `/admin/login` |
| **Dashboard** | `/admin/dashboard` |
| **Productos** | `/admin/dashboard/productos` |
| **Nuevo Producto** | `/admin/dashboard/productos/nuevo` |
| **Editar Producto** | `/admin/dashboard/productos/[id]/editar` |

---

## 🔐 Seguridad

### Base de Datos
- RLS (Row Level Security) habilitado
- Políticas de acceso por rol
- Validación de usuarios autenticados

### Storage
- Bucket público para lectura
- Solo usuarios autenticados pueden subir/modificar
- Límite de 5MB por imagen
- Tipos permitidos: JPG, PNG, WEBP

### Frontend
- Middleware de autenticación en todas las rutas `/admin/*`
- Verificación de permisos en cada página
- Sesiones manejadas por Supabase Auth

---

## 📞 Soporte

Si encuentras algún problema:

1. Verifica que todas las variables de entorno estén configuradas
2. Revisa que el usuario tenga rol de admin en la base de datos
3. Confirma que el bucket de Storage esté público
4. Revisa los logs en Vercel para errores en producción

---

## ✅ Checklist de Deployment

Antes de hacer deploy a producción:

- [x] Variables de entorno configuradas en Vercel
- [x] Bucket `product-images` creado en Supabase
- [x] Script `setup-auth.sql` ejecutado
- [x] Usuario administrador creado
- [x] Imágenes migradas a Supabase Storage
- [ ] Agregar variables NEXT_PUBLIC_* en Vercel
- [ ] Nuevo deploy en Vercel
- [ ] Probar login en producción
- [ ] Verificar que las imágenes se vean correctamente

---

## 🎉 ¡Listo!

El sistema de backoffice está completamente funcional. Ahora puedes gestionar tu catálogo de productos de forma profesional y centralizada.

**Próximos pasos recomendados:**
1. Agregar las variables de Supabase en Vercel
2. Hacer un nuevo deploy
3. Crear tu usuario administrador
4. ¡Empezar a gestionar tus productos!

