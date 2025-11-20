# 📸 Herramienta de Importación de Imágenes

Este script ayuda a organizar, renombrar y mover automáticamente las fotos de los productos desde tu carpeta de descargas directamente a la página web.

**¿Qué hace esta herramienta?**

1.  Toma una carpeta con muchas marcas y productos desordenados.
2.  **Limpia los nombres:** Quita espacios, pone todo en minúsculas y agrega la marca al nombre de la foto (ej: `Filtro Aire.jpg` se convierte en `john-deere-filtro-aire.jpg`).
3.  **Evita duplicados:** Si una foto ya existe, le agrega un número para no borrar la anterior.
4.  **Mueve los archivos:** Los lleva a la carpeta correcta dentro de la página web (`/public/...`).

-----

## 📋 1. Preparar las carpetas (Antes de empezar)

Para que el script funcione, la carpeta que descargaste (ej: desde Google Drive o Email) debe tener esta estructura interna:

```text
Carpeta_Descargada/
├── Marca (ej. John Deere)/
│   ├── Producto (ej. Tractor 5050)/
│   │   ├── foto1.jpg
│   │   └── foto2.png
│   └── Producto (ej. Cosechadora)/
│       └── foto_lado.jpg
└── Otra Marca/
    └── ...
```

> **Nota:** No importa cómo se llame la "Carpeta\_Descargada", pero es importante que adentro las fotos estén organizadas por **Marca \> Producto**.

-----

## 🚀 2. Cómo usar la herramienta

1.  Abre tu terminal (Cmder o la que utilices) en la carpeta del proyecto.
2.  El comando necesita dos cosas: **¿DÓNDE están las fotos?** y **¿A DÓNDE van?**

El formato es:
`node import-images.js "RUTA_ORIGEN" "RUTA_DESTINO"`

### Casos de Uso Comunes:

Copia y pega el comando que necesites, cambiando solo la primera parte (`"..."`) por la ruta donde descargaste tus fotos.

#### 🔩 Opción A: Cargar Repuestos

Si descargaste un lote de repuestos de varias marcas:

```bash
node import-images.js "C:/Usuarios/TuNombre/Downloads/Lote_Repuestos" "./public/images/products/repuestos"
```

#### 🚜 Opción B: Cargar Implementos NUEVOS

Si descargaste maquinaria nueva:

```bash
node import-images.js "C:/Usuarios/TuNombre/Downloads/Maquinas_Nuevas" "./public/images/products/implementos/nuevos"
```

#### 🛠️ Opción C: Cargar Implementos USADOS

Si descargaste maquinaria usada:

```bash
node import-images.js "C:/Usuarios/TuNombre/Downloads/Maquinas_Usadas" "./public/images/products/implementos/usados"
```

-----

## ✅ 3. ¿Qué pasa después?

Verás un resumen en la pantalla como este:

```text
🎉 IMPORT COMPLETE
✅ Images Moved: 50
⚠️ Collisions resolved: 2 (Auto-renamed)
```

  * Tus carpetas de descarga quedarán vacías (las fotos se movieron).
  * Si ves **"Collisions resolved"**, significa que había fotos con el mismo nombre, pero el sistema lo arregló automáticamente agregando un número al final.

-----

## 🆘 Solución de Problemas

  * **Error: "Source directory not found"**
      * Revisa que la ruta de la carpeta de descargas esté bien escrita. Tip: En Windows puedes arrastrar la carpeta a la terminal para que se escriba la ruta sola.
  * **Error: "No subfolders found"**
      * Asegúrate de que dentro de tu carpeta de descargas haya carpetas con los nombres de las Marcas. Si las fotos están sueltas, el script no funcionará.

-----
## 📄 Archivo de Reporte (Excel/CSV)

Al finalizar, la herramienta creará un archivo llamado `manifest_FECHA.csv`.

**Instrucciones para Carga de Datos:**
1.  Abre este archivo con **Excel** o Google Sheets.
2.  Verás tres columnas: Brand,	Product,	**Final Filename**.
3.  Usa la columna "Final Filename" para llenar la base de datos. Esos son los nombres exactos que quedaron en la página web.