import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testCRUDRepuesto() {
  console.log('\n🧪 ========================================')
  console.log('   TEST CRUD - REPUESTO')
  console.log('========================================\n')

  let repuestoId: string | null = null
  let imagePath: string | null = null

  try {
    // ============================================
    // PASO 1: CREATE - Crear repuesto de prueba
    // ============================================
    console.log('📝 Paso 1: CREATE - Crear repuesto de prueba\n')

    // Crear imagen de prueba (PNG simple 1x1)
    const testImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    )

    const timestamp = Date.now()
    const fileName = `test-repuesto-${timestamp}.png`
    const marca = 'Test Brand'
    const marcaLowercase = marca.toLowerCase().replace(/\s+/g, '-')
    imagePath = `repuestos/${marcaLowercase}/${fileName}`

    console.log('   📤 Subiendo imagen de prueba...')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(imagePath, testImageBuffer, {
        contentType: 'image/png',
        upsert: false
      })

    if (uploadError) throw new Error(`Error subiendo imagen: ${uploadError.message}`)
    console.log(`   ✅ Imagen subida: ${imagePath}`)

    // Insertar repuesto en la base de datos
    console.log('   💾 Insertando repuesto en la base de datos...')
    
    const repuestoData = {
      nombre: 'Repuesto Test CRUD',
      marca: marca,
      categoria: 'Test',
      descripcion: 'Este es un repuesto de prueba para el test CRUD',
      ids_imagenes: [imagePath]
    }

    const { data: insertData, error: insertError } = await supabase
      .from('repuestos')
      .insert([repuestoData])
      .select()
      .single()

    if (insertError) throw new Error(`Error creando repuesto: ${insertError.message}`)
    
    repuestoId = insertData.id
    console.log(`   ✅ Repuesto creado con ID: ${repuestoId}`)
    console.log(`   📦 Datos: ${insertData.nombre} - ${insertData.marca}`)
    console.log(`   🖼️  Imágenes: ${insertData.ids_imagenes.length}\n`)

    // ============================================
    // PASO 2: READ - Leer repuesto
    // ============================================
    console.log('📖 Paso 2: READ - Leer repuesto\n')

    const { data: readData, error: readError } = await supabase
      .from('repuestos')
      .select('*')
      .eq('id', repuestoId)
      .single()

    if (readError) throw new Error(`Error leyendo repuesto: ${readError.message}`)

    console.log('   ✅ Repuesto encontrado:')
    console.log(`   - ID: ${readData.id}`)
    console.log(`   - Nombre: ${readData.nombre}`)
    console.log(`   - Marca: ${readData.marca}`)
    console.log(`   - Categoría: ${readData.categoria}`)
    console.log(`   - Descripción: ${readData.descripcion}`)
    console.log(`   - Imágenes: ${readData.ids_imagenes.join(', ')}`)

    // Verificar que la imagen existe en Storage
    console.log('\n   🔍 Verificando imagen en Storage...')
    const { data: listData, error: listError } = await supabase.storage
      .from('product-images')
      .list(`repuestos/${marcaLowercase}`, {
        search: fileName
      })

    if (listError) throw new Error(`Error listando imágenes: ${listError.message}`)
    
    const imageExists = listData && listData.length > 0
    if (imageExists) {
      console.log(`   ✅ Imagen encontrada en Storage: ${fileName}\n`)
    } else {
      throw new Error('Imagen no encontrada en Storage')
    }

    // ============================================
    // PASO 3: UPDATE - Actualizar repuesto
    // ============================================
    console.log('✏️  Paso 3: UPDATE - Actualizar repuesto\n')

    console.log('   📝 Actualizando datos...')
    const { data: updateData, error: updateError } = await supabase
      .from('repuestos')
      .update({
        categoria: 'Test Actualizado',
        descripcion: 'Descripción actualizada por el test CRUD'
      })
      .eq('id', repuestoId)
      .select()
      .single()

    if (updateError) throw new Error(`Error actualizando repuesto: ${updateError.message}`)

    console.log('   ✅ Repuesto actualizado:')
    console.log(`   - Nueva categoría: ${updateData.categoria}`)
    console.log(`   - Nueva descripción: ${updateData.descripcion}\n`)

    // ============================================
    // PASO 4: DELETE - Eliminar repuesto
    // ============================================
    console.log('🗑️  Paso 4: DELETE - Eliminar repuesto\n')

    console.log('   🗑️  Eliminando repuesto de la base de datos...')
    const { error: deleteError } = await supabase
      .from('repuestos')
      .delete()
      .eq('id', repuestoId)

    if (deleteError) throw new Error(`Error eliminando repuesto: ${deleteError.message}`)
    console.log('   ✅ Repuesto eliminado de la base de datos')

    // Verificar que se eliminó
    console.log('   🔍 Verificando eliminación...')
    const { data: verifyData } = await supabase
      .from('repuestos')
      .select('*')
      .eq('id', repuestoId)
      .single()

    if (!verifyData) {
      console.log('   ✅ Confirmado: Repuesto no existe en la base de datos\n')
    }

    // Eliminar imagen de Storage
    console.log('   🧹 Limpiando imágenes del Storage...')
    const { error: deleteStorageError } = await supabase.storage
      .from('product-images')
      .remove([imagePath])

    if (deleteStorageError) {
      console.log(`   ⚠️  Advertencia: No se pudo eliminar la imagen: ${deleteStorageError.message}`)
    } else {
      console.log(`   ✅ Imagen eliminada: ${imagePath}\n`)
    }

    // ============================================
    // RESUMEN
    // ============================================
    console.log('✅ ========================================')
    console.log('   TEST CRUD COMPLETADO EXITOSAMENTE')
    console.log('========================================\n')
    console.log('   ✅ CREATE: Repuesto e imagen creados')
    console.log('   ✅ READ: Repuesto leído correctamente')
    console.log('   ✅ UPDATE: Repuesto actualizado correctamente')
    console.log('   ✅ DELETE: Repuesto e imágenes eliminados\n')
    console.log('🎉 El backoffice funciona correctamente para repuestos!\n')

  } catch (error: any) {
    console.error('\n❌ ========================================')
    console.error('   ERROR EN EL TEST')
    console.error('========================================\n')
    console.error(`   ${error.message}\n`)

    // Limpieza en caso de error
    if (repuestoId) {
      console.log('🧹 Limpiando datos de prueba...')
      await supabase.from('repuestos').delete().eq('id', repuestoId)
    }
    if (imagePath) {
      await supabase.storage.from('product-images').remove([imagePath])
    }

    process.exit(1)
  }
}

testCRUDRepuesto()

