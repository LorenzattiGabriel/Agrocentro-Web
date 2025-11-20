# 🚜 Gestión de Contenido y Catálogo

Este documento detalla el flujo de trabajo para procesar imágenes y datos de productos, así como las instrucciones técnicas para mostrarlos en la página web (Next.js).

---

## 📋 Requisitos Previos

1.  Tener **Node.js** instalado en la computadora.
2.  Abrir la terminal (Cmder, PowerShell o Terminal) en la carpeta raíz de este proyecto.

---

## 📸 Parte 1: Procesamiento de Imágenes

Utilizamos el script `import-images.js` para estandarizar nombres, evitar duplicados y organizar las fotos automáticamente.

### 1. Estructura de la Carpeta de Origen
La carpeta que descargues (ej. desde Google Drive) **debe** tener esta estructura interna:

```text
Carpeta_Descargada/
├── Marca (ej. John Deere)/
│   ├── Producto (ej. Tractor 5050)/
│   │   ├── foto1.jpg
│   │   └── foto2.png
└── Otra Marca/
    └── ...
````

### 2\. Comandos de Importación

Ejecuta el comando correspondiente según el tipo de producto que estés cargando. Reemplaza `"RUTA_DE_ORIGEN"` por la carpeta donde tienes las fotos.

**🔩 Para REPUESTOS:**

```bash
node import-images.js "RUTA_DE_ORIGEN" "./public/images/products/repuestos"
```

**🚜 Para Implementos NUEVOS:**

```bash
node import-images.js "RUTA_DE_ORIGEN" "./public/images/products/implementos/nuevos"
```

**🛠️ Para Implementos USADOS:**

```bash
node import-images.js "RUTA_DE_ORIGEN" "./public/images/products/implementos/usados"
```

### 3\. El Reporte (Manifiesto)

Al finalizar, el sistema creará un archivo Excel/CSV en la carpeta `/import-manifests` con el nombre `manifest_FECHA.csv`.

> **IMPORTANTE PARA CARGA DE DATOS:**
> Este archivo contiene la columna **"Final Filename"**. Copia estos nombres exactos para pegarlos en tu base de datos o JSON.

-----

## 📊 Parte 2: Procesamiento de Datos (Excel a JSON)

El script convierte el archivo TSV en un JSON limpio y lo guarda en una carpeta temporal llamada `/temp_data`.

### 1. Descargar datos
Descarga tu hoja de cálculo como `.tsv`.

### 2. Ejecutar conversión (Obligatorio indicar PATH del archivo)

Debes indicar el path exacto del archivo que descargaste.

**🔹 Para cargar productos NUEVOS:**
```bash
node convert-tsv-json.js ""C:\Users\Usuario\Downloads\Nuevos productos para cargar.tsv""
```

**🔸 Para cargar productos USADOS: Agrega la palabra usado al final del comando.**

```Bash

node convert-tsv-json.js ""C:\Users\Usuario\Downloads\Nuevos productos para cargar.tsv"" usado
```
#### Resultado (/temp_data)
El script creará una carpeta temp_data y guardará allí el archivo JSON (ej. temp_data/Nuevos productos.json). Abre ese archivo para revisar los datos y completar la información faltante antes de moverlo a tu base de datos final.


# Ignorar carpetas temporales de datos (.gitignore)
```
# carpetas temporales de data entry
/temp_data
```

-----

## 🧠 Parte 3: Integración y Autocompletado con IA

Una vez que tengas el archivo JSON generado en la carpeta `temp_data`, sigue estos pasos para integrarlo a la web y completar los datos faltantes automáticamente.

### 1. Copiar a la Base de Datos
1.  Abre el archivo generado en `temp_data/`.
2.  Copia los objetos (el contenido).
3.  Pégalos al final de tu archivo principal de productos (ubicado en `/src/constants/` o `/constants/`).

### 2. Autocompletar con IA (Cursor / Copilot)
Como el script deja vacíos los campos `modelo`, `categoria` e `ids_imagenes`, utiliza este **Prompt** para que la Inteligencia Artificial complete el trabajo por ti.

Copia y pega esto en tu chat de IA (recomendado usar Cursor o VS Code Copilot que pueden leer tus archivos):

```text
As an expert JSON formatter and data entry specialist, in the file [PEGAR RUTA DEL ARCHIVO JSON EN CONSTANTS] from line [NUMERO DE LINEA DONDE PEGASTE LOS DATOS] onwards, guess and add the data of fields "modelo" and "categoria", following the existing structure of the JSON file. Also, add the filenames of each product image considering the manifest file at [PEGAR RUTA DEL ARCHIVO CSV MANIFEST].
```
### Nota: 
Debes reemplazar los textos entre corchetes [...] con las rutas reales de tus archivos.

#### Ejemplo JSON: 
```src/constants/products.json```

#### Ejemplo Manifest: 
```import-manifests/manifest_2025-11-19.csv```

---

## 💻 Parte 4: Guía para Desarrolladores (Frontend)

Notas técnicas para integrar estos datos en Next.js.

### 1\. Renderizado de Descripciones (Saltos de línea)

El campo `descripcion` contiene caracteres `\n`. Para que el navegador los respete y no muestre un bloque de texto plano, utiliza CSS.

**Método Recomendado (Tailwind / CSS puro):**
Usa la propiedad `white-space: pre-wrap`.

```jsx
// Componente ProductCard.js o similar
<p className="text-gray-700" style={{ whiteSpace: "pre-wrap" }}>
  {product.descripcion}
</p>
```

**Método Alternativo (Listas):**
Si necesitas separar cada línea en un elemento HTML distinto:

```jsx
<div>
  {product.descripcion.split('\n').map((line, index) => (
    <p key={index} className="mb-2">
      {line}
    </p>
  ))}
</div>
```
