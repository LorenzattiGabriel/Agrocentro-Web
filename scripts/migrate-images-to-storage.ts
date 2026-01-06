import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Faltan variables de entorno:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = 'product-images';
const LOCAL_IMAGES_PATH = path.join(process.cwd(), 'public/images/products');

interface UploadResult {
  localPath: string;
  storagePath: string;
  success: boolean;
  error?: string;
}

/**
 * Sube una imagen al bucket de Supabase Storage
 */
async function uploadImage(localFilePath: string, storagePath: string): Promise<boolean> {
  try {
    const fileBuffer = fs.readFileSync(localFilePath);
    const contentType = getContentType(localFilePath);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true, // Reemplazar si ya existe
      });

    if (error) {
      console.error(`   ❌ Error subiendo ${storagePath}:`, error.message);
      return false;
    }

    console.log(`   ✅ Subida: ${storagePath}`);
    return true;
  } catch (error: any) {
    console.error(`   ❌ Error inesperado subiendo ${storagePath}:`, error.message);
    return false;
  }
}

/**
 * Obtiene el content-type basado en la extensión del archivo
 */
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

/**
 * Obtiene todas las imágenes de un directorio recursivamente
 */
function getAllImages(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath, baseDir));
    } else if (stat.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
      const relativePath = path.relative(baseDir, filePath);
      results.push(relativePath);
    }
  }

  return results;
}

/**
 * Función principal de migración
 */
async function migrateImages() {
  console.log('🚀 Iniciando migración de imágenes a Supabase Storage...\n');

  // Verificar que el bucket existe
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  
  if (bucketError) {
    console.error('❌ Error verificando buckets:', bucketError);
    process.exit(1);
  }

  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.error(`❌ El bucket "${BUCKET_NAME}" no existe.`);
    console.error('   Ejecuta primero el script setup-storage.sql en Supabase SQL Editor');
    process.exit(1);
  }

  console.log(`✅ Bucket "${BUCKET_NAME}" encontrado\n`);

  // Obtener todas las imágenes locales
  console.log('📂 Escaneando imágenes locales...');
  const images = getAllImages(LOCAL_IMAGES_PATH);
  console.log(`   Encontradas ${images.length} imágenes\n`);
  console.log('📁 Estructura del bucket:');
  console.log('   - implementos/nuevos/');
  console.log('   - implementos/usados/');
  console.log('   - repuestos/\n');

  if (images.length === 0) {
    console.log('⚠️  No se encontraron imágenes para migrar');
    return;
  }

  // Subir imágenes
  console.log('⬆️  Subiendo imágenes...\n');
  
  const results: UploadResult[] = [];
  let successCount = 0;
  let errorCount = 0;

  for (const imagePath of images) {
    const localFilePath = path.join(LOCAL_IMAGES_PATH, imagePath);
    const storagePath = imagePath.replace(/\\/g, '/'); // Normalizar path para storage

    const success = await uploadImage(localFilePath, storagePath);
    
    results.push({
      localPath: imagePath,
      storagePath,
      success,
    });

    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  // Resumen
  console.log('\n📊 Resumen de migración:');
  console.log(`   ✅ Exitosas: ${successCount}`);
  console.log(`   ❌ Fallidas: ${errorCount}`);
  console.log(`   📦 Total: ${images.length}\n`);

  if (errorCount > 0) {
    console.log('⚠️  Revisa los errores anteriores para más detalles');
  }

  console.log('✨ Migración completada!\n');
  console.log('📝 Próximos pasos:');
  console.log('   1. Las imágenes ahora están en Supabase Storage');
  console.log(`   2. URL base: ${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`);
  console.log('   3. Actualiza tu código para usar las nuevas URLs\n');
}

// Ejecutar migración
migrateImages()
  .catch((error) => {
    console.error('❌ Error fatal durante la migración:', error);
    process.exit(1);
  });

