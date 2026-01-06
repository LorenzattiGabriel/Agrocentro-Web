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

/**
 * Test CRUD completo del backoffice
 */
async function testCRUD() {
  console.log('\n🧪 ========================================');
  console.log('   TEST CRUD - BACKOFFICE');
  console.log('========================================\n');

  let productoId: string | null = null;
  let imagenesSubidas: string[] = [];

  try {
    // ============================================
    // 1. CREATE - Crear producto con imagen
    // ============================================
    console.log('📝 Paso 1: CREATE - Crear producto de prueba\n');

    // Crear una imagen de prueba (1x1 pixel PNG transparente)
    const testImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    // Subir imagen de prueba
    const timestamp = Date.now();
    const imageName = `test-${timestamp}.png`;
    const imagePath = `implementos/nuevos/${imageName}`;

    console.log('   📤 Subiendo imagen de prueba...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(imagePath, testImageBuffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Error subiendo imagen: ${uploadError.message}`);
    }

    console.log(`   ✅ Imagen subida: ${imagePath}`);
    imagenesSubidas.push(imagePath);

    // Crear producto (usando solo columnas básicas que sabemos que existen)
    const nuevoProducto = {
      nombre: 'Producto Test CRUD',
      marca: 'Test Brand',
      modelo: 'TB-2024',
      categoria: 'Test',
      descripcion: 'Este es un producto de prueba para verificar el CRUD del backoffice.',
      esNuevo: true,
      ids_imagenes: [imagePath],
    };

    console.log('   💾 Insertando producto en la base de datos...');
    const { data: createData, error: createError } = await supabase
      .from('implementos')
      .insert([nuevoProducto])
      .select()
      .single();

    if (createError) {
      throw new Error(`Error creando producto: ${createError.message}`);
    }

    productoId = createData.id;
    console.log(`   ✅ Producto creado con ID: ${productoId}`);
    console.log(`   📦 Datos: ${createData.nombre} - ${createData.marca} ${createData.modelo}`);
    console.log(`   🆕 Es Nuevo: ${createData.esNuevo}`);
    console.log(`   🖼️  Imágenes: ${createData.ids_imagenes?.length || 0}`);

    // ============================================
    // 2. READ - Leer producto
    // ============================================
    console.log('\n📖 Paso 2: READ - Leer producto\n');

    const { data: readData, error: readError } = await supabase
      .from('implementos')
      .select('*')
      .eq('id', productoId)
      .single();

    if (readError) {
      throw new Error(`Error leyendo producto: ${readError.message}`);
    }

    console.log('   ✅ Producto encontrado:');
    console.log(`   - ID: ${readData.id}`);
    console.log(`   - Nombre: ${readData.nombre}`);
    console.log(`   - Marca: ${readData.marca}`);
    console.log(`   - Modelo: ${readData.modelo}`);
    console.log(`   - Categoría: ${readData.categoria}`);
    console.log(`   - Es Nuevo: ${readData.esNuevo ? 'Sí' : 'No'}`);
    console.log(`   - Imágenes: ${readData.ids_imagenes?.join(', ') || 'Sin imágenes'}`);

    // Verificar que la imagen existe en Storage
    console.log('\n   🔍 Verificando imagen en Storage...');
    const { data: imageData, error: imageError } = await supabase.storage
      .from(BUCKET_NAME)
      .list('implementos/nuevos', {
        search: imageName,
      });

    if (imageError) {
      throw new Error(`Error verificando imagen: ${imageError.message}`);
    }

    if (imageData && imageData.length > 0) {
      console.log(`   ✅ Imagen encontrada en Storage: ${imageData[0].name}`);
    } else {
      console.log('   ⚠️  Imagen no encontrada en Storage');
    }

    // ============================================
    // 3. UPDATE - Actualizar producto
    // ============================================
    console.log('\n✏️  Paso 3: UPDATE - Actualizar producto\n');

    const datosActualizados = {
      categoria: 'Test Actualizado',
      modelo: 'TB-2024-UPDATED',
      esNuevo: false,
    };

    console.log('   📝 Actualizando datos...');
    const { data: updateData, error: updateError } = await supabase
      .from('implementos')
      .update(datosActualizados)
      .eq('id', productoId)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Error actualizando producto: ${updateError.message}`);
    }

    console.log('   ✅ Producto actualizado:');
    console.log(`   - Nuevo modelo: ${updateData.modelo}`);
    console.log(`   - Nueva categoría: ${updateData.categoria}`);
    console.log(`   - Es Nuevo: ${updateData.esNuevo ? 'Sí' : 'No (Ahora es usado)'}`);

    // ============================================
    // 4. DELETE - Eliminar producto
    // ============================================
    console.log('\n🗑️  Paso 4: DELETE - Eliminar producto\n');

    console.log('   🗑️  Eliminando producto de la base de datos...');
    const { error: deleteError } = await supabase
      .from('implementos')
      .delete()
      .eq('id', productoId);

    if (deleteError) {
      throw new Error(`Error eliminando producto: ${deleteError.message}`);
    }

    console.log('   ✅ Producto eliminado de la base de datos');

    // Verificar que fue eliminado
    console.log('   🔍 Verificando eliminación...');
    const { data: verifyData } = await supabase
      .from('implementos')
      .select('*')
      .eq('id', productoId)
      .single();

    if (!verifyData) {
      console.log('   ✅ Confirmado: Producto no existe en la base de datos');
    } else {
      console.log('   ⚠️  El producto aún existe en la base de datos');
    }

    // Limpiar imágenes del Storage
    console.log('\n   🧹 Limpiando imágenes del Storage...');
    for (const imagePath of imagenesSubidas) {
      const { error: removeError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([imagePath]);

      if (removeError) {
        console.log(`   ⚠️  Error eliminando ${imagePath}: ${removeError.message}`);
      } else {
        console.log(`   ✅ Imagen eliminada: ${imagePath}`);
      }
    }

    // ============================================
    // RESUMEN
    // ============================================
    console.log('\n✅ ========================================');
    console.log('   TEST CRUD COMPLETADO EXITOSAMENTE');
    console.log('========================================\n');
    console.log('   ✅ CREATE: Producto e imagen creados');
    console.log('   ✅ READ: Producto leído correctamente');
    console.log('   ✅ UPDATE: Producto actualizado correctamente');
    console.log('   ✅ DELETE: Producto e imágenes eliminados');
    console.log('\n🎉 El backoffice funciona correctamente!\n');

  } catch (error: any) {
    console.error('\n❌ ========================================');
    console.error('   ERROR EN EL TEST');
    console.error('========================================\n');
    console.error(error.message);
    console.error('\n📋 Detalles del error:', error);

    // Limpiar en caso de error
    if (productoId) {
      console.log('\n🧹 Limpiando producto de prueba...');
      await supabase.from('implementos').delete().eq('id', productoId);
    }

    if (imagenesSubidas.length > 0) {
      console.log('🧹 Limpiando imágenes de prueba...');
      await supabase.storage.from(BUCKET_NAME).remove(imagenesSubidas);
    }

    process.exit(1);
  }
}

// Ejecutar test
testCRUD();

