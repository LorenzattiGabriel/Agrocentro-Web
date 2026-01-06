# 🧪 Testing del Backoffice - Guía de Pruebas

## ✅ Servidor en ejecución
- **URL**: http://localhost:3000
- **Status**: ✅ Listo en 2.3s

---

## 📝 Checklist de Pruebas

### 1️⃣ Crear Primer Usuario Admin (Solo primera vez)

Si aún no tienes un usuario, sigue estos pasos:

1. Ve a **Supabase Dashboard** → **Authentication** → **Users**
2. Click en **"Add user"** → **"Create new user"**
3. Completa:
   - Email: `admin@agrocentro.com` (o tu email)
   - Password: `Admin123!` (o la que prefieras)
   - ✅ **Auto Confirm User** activado
4. Click **"Create user"**

5. Ve a **SQL Editor** y ejecuta:
```sql
UPDATE public.admin_profiles 
SET role = 'super_admin' 
WHERE email = 'admin@agrocentro.com';
```

---

### 2️⃣ Prueba 1: Login

**URL**: http://localhost:3000/admin/login

1. Ingresa tus credenciales:
   - Email: `admin@agrocentro.com`
   - Password: `Admin123!`
2. Click en **"Ingresar"**
3. ✅ **Esperado**: Deberías ser redirigido a `/admin/dashboard`

**Posibles errores:**
- ❌ "No tienes permisos de administrador" → Ejecuta el UPDATE en Supabase
- ❌ "Invalid login credentials" → Verifica email/password

---

### 3️⃣ Prueba 2: Agregar Producto Nuevo con Imagen

**URL**: http://localhost:3000/admin/dashboard/productos/nuevo

#### Pasos:

1. **Seleccionar tipo**: Implemento

2. **Completar formulario**:
   - Nombre: `Sembradora de Prueba`
   - Marca: `Test Brand`
   - Modelo: `TB-2024`
   - Categoría: `Sembradoras`
   - Estado: `Nuevo` (verifica que diga "Se guardará en: implementos/nuevos/")
   - Precio: `50000`
   - Descripción: `Esta es una sembradora de prueba para verificar el funcionamiento del backoffice.`

3. **Subir imagen**:
   - Click en el área de "Haz clic para seleccionar imágenes"
   - Selecciona una imagen de tu computadora (cualquier JPG/PNG)
   - ✅ Verifica que aparezca la preview de la imagen

4. Click en **"Guardar Producto"**

5. ✅ **Esperado**: 
   - Mensaje "Subiendo imágenes..." mientras sube
   - Mensaje "Guardando..." mientras guarda
   - Redirección a `/admin/dashboard/productos`
   - El nuevo producto aparece en el listado

**Verifica en Supabase:**
- Storage → product-images → implementos → nuevos → Debería estar tu imagen
- Table Editor → implementos → Debería estar tu producto

---

### 4️⃣ Prueba 3: Ver el Producto en el Frontend

**URL**: http://localhost:3000/implementos-nuevos

1. Busca tu producto "Sembradora de Prueba"
2. Click en la tarjeta
3. ✅ **Esperado**:
   - La imagen se carga desde Supabase Storage
   - Si falla, intenta cargar desde `/images/products/` (fallback)
   - Si falla ambos, muestra `/placeholder.svg`
   - Toda la información se muestra correctamente

**Para verificar de dónde carga la imagen:**
- Abre las DevTools (F12)
- Ve a la pestaña **Network**
- Recarga la página
- Busca la imagen
- Debería cargar desde: `https://zyybiudqmvxmvwqaveex.supabase.co/storage/v1/object/public/product-images/implementos/nuevos/...`

---

### 5️⃣ Prueba 4: Editar Descripción del Producto

**URL**: http://localhost:3000/admin/dashboard/productos

1. En el listado, encuentra "Sembradora de Prueba"
2. Click en el botón de **editar** (ícono de lápiz)
3. ✅ **Esperado**: 
   - Se carga toda la información del producto
   - La imagen aparece en "Imágenes actuales"

4. **Editar descripción**:
   - Cambia la descripción a: `Descripción actualizada - Sembradora de prueba editada exitosamente.`
   - Opcionalmente: Agrega una segunda imagen

5. Click en **"Guardar Cambios"**

6. ✅ **Esperado**:
   - Redirección al listado
   - Cambios guardados correctamente

7. **Verificar en frontend**:
   - Ve a http://localhost:3000/implementos-nuevos
   - Busca el producto
   - Click en él
   - ✅ La descripción debería estar actualizada

---

### 6️⃣ Prueba 5: Eliminar el Producto

**URL**: http://localhost:3000/admin/dashboard/productos

1. En el listado, encuentra "Sembradora de Prueba"
2. Click en el botón de **eliminar** (ícono de basura rojo)
3. ✅ **Esperado**: 
   - Aparece confirmación: "¿Estás seguro de eliminar este producto?"
   - Click en **OK**

4. ✅ **Esperado**:
   - El producto desaparece del listado
   - El contador de "Total" se actualiza

5. **Verificar en frontend**:
   - Ve a http://localhost:3000/implementos-nuevos
   - ✅ El producto ya NO debería aparecer

**Nota**: La imagen permanece en Supabase Storage (se puede limpiar manualmente después)

---

## 🔍 Pruebas Adicionales Recomendadas

### Prueba 6: Agregar Repuesto
- Repite los pasos 3-6 pero seleccionando **"Repuesto"** en lugar de Implemento
- Las imágenes deberían guardarse en: `repuestos/`

### Prueba 7: Agregar Implemento Usado
- Repite los pasos 3-6 pero seleccionando **Estado: "Usado"**
- Las imágenes deberían guardarse en: `implementos/usados/`

### Prueba 8: Filtros y Búsqueda
En `/admin/dashboard/productos`:
- Prueba buscar por nombre
- Prueba filtrar por tipo (Implemento/Repuesto)
- Prueba buscar por marca

### Prueba 9: Fallback de Imágenes
1. Crea un producto nuevo con imagen
2. Ve a Supabase Storage y elimina la imagen
3. Recarga la página del producto en el frontend
4. ✅ Debería intentar cargar desde `/images/products/` (fallback)
5. ✅ Si no existe, muestra `/placeholder.svg`

### Prueba 10: Logout
En `/admin/dashboard`:
- Click en **"Cerrar Sesión"**
- ✅ Deberías ser redirigido a `/admin/login`
- ✅ Al intentar acceder a `/admin/dashboard` sin login, te redirige a login

---

## 📊 Checklist Final

- [ ] Login funciona correctamente
- [ ] Agregar producto con imagen funciona
- [ ] Las imágenes se suben a Supabase Storage
- [ ] La estructura de carpetas es correcta (implementos/nuevos, implementos/usados, repuestos)
- [ ] El producto aparece en el frontend
- [ ] Las imágenes cargan desde Supabase
- [ ] El fallback a imágenes locales funciona
- [ ] Editar producto funciona
- [ ] La descripción se actualiza correctamente
- [ ] Eliminar producto funciona
- [ ] El producto desaparece del frontend
- [ ] Búsqueda y filtros funcionan
- [ ] Logout funciona

---

## 🐛 Problemas Comunes

### Error: "Environment variable not found: DATABASE_URL"
**Solución**: Verifica que el archivo `.env` esté en la raíz del proyecto

### Error: "Can't reach database server"
**Solución**: Verifica que las URLs de Supabase sean correctas en `.env`

### Error: "Failed to upload image"
**Solución**: 
1. Verifica que el bucket `product-images` exista
2. Verifica que sea público
3. Verifica que tengas las variables SUPABASE_SERVICE_ROLE_KEY configuradas

### Las imágenes no se ven en el frontend
**Solución**:
1. Abre DevTools → Network
2. Verifica si intenta cargar desde Supabase
3. Verifica el fallback local
4. El componente `ProductImage` debería manejar automáticamente el fallback

---

## 🎉 ¡Todo listo!

Si todas las pruebas pasan, el backoffice está funcionando correctamente y listo para producción.

**Próximos pasos:**
1. Agregar las variables de entorno en Vercel
2. Hacer deploy
3. Crear tu usuario admin en producción
4. ¡Empezar a gestionar tu catálogo!

