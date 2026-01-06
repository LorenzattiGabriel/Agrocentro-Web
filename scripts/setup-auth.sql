-- ==========================================
-- CONFIGURACIÓN DE AUTENTICACIÓN Y USUARIOS ADMIN
-- ==========================================
-- Ejecuta este script en Supabase SQL Editor

-- 1. Crear tabla de perfiles de admin
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS en la tabla
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Política: Los admins solo pueden ver su propio perfil
CREATE POLICY "Admins can view their own profile"
ON public.admin_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 4. Política: Solo super_admins pueden insertar nuevos admins
CREATE POLICY "Super admins can create admin profiles"
ON public.admin_profiles FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- 5. Política: Los admins pueden actualizar su propio perfil
CREATE POLICY "Admins can update their own profile"
ON public.admin_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 6. Función para crear perfil de admin automáticamente después del registro
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger para crear el perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin();

-- 8. Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON public.admin_profiles(email);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles(role);

-- ==========================================
-- CREAR PRIMER USUARIO SUPER ADMIN
-- ==========================================
-- IMPORTANTE: Después de ejecutar este script:
-- 1. Ve a Authentication > Users en Supabase Dashboard
-- 2. Crea manualmente el primer usuario con email y contraseña
-- 3. Luego ejecuta el siguiente UPDATE para hacerlo super_admin:

-- UPDATE public.admin_profiles 
-- SET role = 'super_admin' 
-- WHERE email = 'tu-email@ejemplo.com';

-- Verificar tablas creadas
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'admin_profiles';

SELECT * FROM public.admin_profiles;

