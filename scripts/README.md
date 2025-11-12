# Script

npx tsx scripts\sanitize-images-filename.ts images/products/implementos/nuevos images/products/implementos/usados images/products/repuestos/crucianelli images/products/repuestos/giorgi


# Actualizar DB (Seed)

Para sincronizar la base de datos con los datos de los archivos JSON (implementos.json, repuestos.json), ejecuta el siguiente comando:
`npx tsx scripts/seed.ts`


# Actualizar productos

## Pasos:

## 1. Subir imagenes. Se sigue la estructura en `\constants\images-paths.ts`. 

- En `/public/images/products` (o lo que se indique en `images-paths.ts`) crear la carpeta de la MARCA dentro de la carpeta `/implementos` o `/repuestos` según el tipo de producto. 
- Si el nombre de la MARCA tiene espacios, estos se reemplazan con guión medio (-). Ej: `prado verde` -> `prado-verde`.
- Si el nombre tiene "variedad" u "otros" se reemplaza por `variedad`.

- Una vez se tiene la carpeta de la marca, copiar las imagenes a la carpeta directamente (NO hace falta modificar nombres de archivo manualmente).

- Sanitizar nombres de archivos de imagenes corriendo el script `scripts/sanitize-images-filename.ts`. **Nota: es obligatorio ejecutarlo con TypeScript (instalar el package 'tsx' en "devDependencies" del package.json)**.

Ejemplo de ejecución:

```
npx tsx scripts/sanitize-images-filename.ts
-----------------------------------------
� Scanning for files with spaces in: \public\images\products\repuestos
� Scanning for files with spaces in: \public\images\products\repuestos\crucianelli
� Scanning for files with spaces in:  \public\images\products\repuestos\darmet
� Scanning for files with spaces in: \public\images\products\repuestos\giorgi
� Scanning for files with spaces in: \public\images\products\repuestos\juta
✅ Renamed: "3. Red de atado_.jpg"  ->  "3.-Red-de-atado_.jpg"
� Scanning for files with spaces in: \public\images\products\repuestos\parval
✅ Renamed: "2. Hilos para enrrollar _ marva parval.jpg"  ->  "2.-Hilos-para-enrrollar-_-marva-parval.jpg"
� Scanning for files with spaces in: \public\images\products\repuestos\prado-verde
✅ Renamed: "1. Hilos para enrrollar _ marca prado verde.jpg"  ->  "1.-Hilos-para-enrrollar-_-marca-prado-verde.jpg"
� Scanning for files with spaces in: \public\images\products\repuestos\variedad
✅ Renamed: "5. Rodamientos.jpg"  ->  "5.-Rodamientos.jpg"
✅ Renamed: "7. Filtros de aceite y combustible.png"  ->  "7.-Filtros-de-aceite-y-combustible.png"
✨ Renamed 5 file(s) in images/products/repuestos.
-----------------------------------------

� Successfully renamed a total of 5 file(s).
```

## 2. Subir datos de producto

- Formatear datos de los productos según el formato existente en `constants\productos\implementos.json` o `constants\productos\repuestos.json` según corresponda.
Ej: en `implementos.json` se sigue el siguiente formato:
```
{
    "nombre": "nombre del producto", //String
    "marca": "marca del producto", //String. Aqui SI pueden ir espacios en el String
    "modelo": "modelo del producto",//String
    "categoria": "categoria del producto",//String
    "esNuevo": false,  //boolean
    "anio": 2012, // Integer
    "ids_imagenes": [ //String[]
      "1.-Mixer-horizontal-(1).jpg", //String. Solo el nombre del archivo, el PATH se infiere con la MARCA en el servidor
      "1.-Mixer-horizontal-(2).jpg"
    ],
    "descripcion": "descripcion del producto"//String
  },
```

- Agregar cada nombre de archivo de imagen a `ids_imagenes`. SOLO EL NOMBRE DE ARCHIVO (el PATH se infiere con la MARCA en el servidor).

- **Agregar** productos formateados al archivo JSON correspondiente.

- Nota: Si se agrega una nueva MARCA, asegurarse de crear la carpeta correspondiente en `/public/images/products/implementos` o `/public/images/products/repuestos` antes de subir las imagenes.

- Nota 2: Este paso se puede automatizar con IA y la siguiente prompt:
```
As an expert JSON formatter and data entry specialist, at the end of the file [copiar y pegar PATH del archivo JSON] add the data I'll give you, following the existing structure of the JSON file. Also, add the filenames of each product image that can be found on the directory [copiar y pegar PATH de la carpeta de imagenes, por ejemplo '/public/images/products/implementos' o '/public/images/products/repuestos'] The product data is:

[copiar y pegar datos de los productos]

```

- **NOTA 3: Verificar el JSON de nuevo antes de seguir. Si se elimina o modifica algun otro producto del JSON, ese cambio se VERÁ REFLEJADO EN LA DB.**

## 3. Actualizar la base de datos


- Ejecutar el script `scripts/seed.ts` para actualizar la base de datos con los nuevos productos.
`npx tsx scripts/seed.ts`

