import implementosData from '../constants/implementos.json';
import repuestosData from '../constants/repuestos.json';
import { PrismaClient } from '../lib/generated/prisma/client'; // Updated import path

const prisma = new PrismaClient();

/**
 * Synchronizes the `implementos` table with the `implementos.json` file.
 * It will update existing records, insert new ones, and delete obsolete ones.
 */
async function syncImplementos() {
  console.log(`\n🔄 Syncing implementos...`);
  const upsertPromises = implementosData.map((implemento) =>
    prisma.implementos.upsert({
    where: {
        // Use the updated unique constraint to find the record
        nombre_marca_modelo_esNuevo: {
            nombre: implemento.nombre,
            marca: implemento.marca,
            modelo: implemento.modelo,
            esNuevo: implemento.esNuevo,
        },
      },
      update: implemento, // Update with the data from JSON if found
      create: implemento, // Create with the data from JSON if not found
    })
  );

  const results = await Promise.all(upsertPromises);
  console.log(`✅ Upserted ${results.length} implementos.`);

  // Prune (delete) old records that are no longer in the JSON file
  const jsonKeys = new Set(
    implementosData.map(p => `${p.nombre}-${p.marca}-${p.modelo}-${p.esNuevo}`)
  );
  const dbImplementos = await prisma.implementos.findMany({ select: { id: true, nombre: true, marca: true, modelo: true, esNuevo: true } });


  const idsToDelete = dbImplementos
    .filter((dbp) => !jsonKeys.has(`${dbp.nombre}-${dbp.marca}-${dbp.modelo}-${dbp.esNuevo}`))
    .map(dbp => dbp.id);

  if (idsToDelete.length > 0) {
    console.log(`🧹 Pruning ${idsToDelete.length} old implementos...`);
    await prisma.implementos.deleteMany({
      where: { id: { in: idsToDelete } },
    });
  }
}

/**
 * Synchronizes the `repuestos` table with the `repuestos.json` file.
 */
async function syncRepuestos() {
  console.log(`\n🔄 Syncing repuestos...`);
  const upsertPromises = repuestosData.map((repuesto) =>
    prisma.repuestos.upsert({
      where: {
        // Use the unique constraint to find the record
        nombre_marca: {
          nombre: repuesto.nombre,
          marca: repuesto.marca,
        },
      },
      update: repuesto,
      create: repuesto,
    })
  );

  const results = await Promise.all(upsertPromises);
  console.log(`✅ Upserted ${results.length} repuestos.`);

  // Prune (delete) old records
  const jsonKeys = new Set(repuestosData.map(p => `${p.nombre}-${p.marca}`));
  const dbRepuestos = await prisma.repuestos.findMany({ select: { id: true, nombre: true, marca: true } });


  const idsToDelete = dbRepuestos
    .filter((db_r) => !jsonKeys.has(`${db_r.nombre}-${db_r.marca}`))
    .map(db_r => db_r.id);

  if (idsToDelete.length > 0) {
    console.log(`🧹 Pruning ${idsToDelete.length} old repuestos...`);
    await prisma.repuestos.deleteMany({
      where: { id: { in: idsToDelete } },
    });
  }
}

async function main() {
  console.log(`🌱 Starting database sync...`);

  await syncImplementos();
  await syncRepuestos();

  console.log(`\n✨ Sync finished successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ An error occurred while syncing the database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
