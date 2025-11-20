const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const TEMP_DIR_NAME = 'temp_data';

// --- ARGUMENT PROCESSING ---
const args = process.argv.slice(2);

// 1. Detect if "Used"
const isUsed = args.some(arg => ['usado', 'used', '--used', '-u'].includes(arg.toLowerCase()));
const esNuevoValue = !isUsed; 

// 2. Detect Input File (MANDATORY)
const inputFileArg = args.find(arg => arg.endsWith('.tsv'));

if (!inputFileArg) {
    console.error('\n❌ ERROR: Missing source file.');
    console.error('⚠️  Please specify the .tsv file you downloaded.');
    console.error('👉 Example: node convert-tsv-json.js "my_data.tsv"');
    process.exit(1);
}

const INPUT_FILE = inputFileArg;
const outputFileName = path.basename(INPUT_FILE, '.tsv') + '.json';

// --- HELPER: TITLE CASE ---
// Converts "JOHN DEERE" -> "John Deere"
const toTitleCase = (str) => {
    if (!str) return "";
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

// --- ROBUST PARSER ---
const parseTSV = (text) => {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuotes = false;
    const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    for (let i = 0; i < normalizedText.length; i++) {
        const char = normalizedText[i];
        const nextChar = normalizedText[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                currentCell += '"'; 
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === '\t' && !insideQuotes) {
            currentRow.push(currentCell);
            currentCell = '';
        } else if (char === '\n' && !insideQuotes) {
            currentRow.push(currentCell);
            rows.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }
    if (currentCell) currentRow.push(currentCell);
    if (currentRow.length) rows.push(currentRow);
    return rows;
};

try {
    const filePath = path.resolve(INPUT_FILE);
    const tempDirPath = path.join(process.cwd(), TEMP_DIR_NAME);
    const outputPath = path.join(tempDirPath, outputFileName);
    
    console.log(`\n⚙️  STARTING PROCESS:`);
    console.log(`   📂 Input File: ${INPUT_FILE}`);
    console.log(`   🏷️  Mode:       ${esNuevoValue ? 'NEW' : 'USED'}`);
    
    if (!fs.existsSync(filePath)) {
        throw new Error(`The file "${INPUT_FILE}" does not exist.`);
    }

    if (!fs.existsSync(tempDirPath)) {
        fs.mkdirSync(tempDirPath);
        console.log(`   📁 Created folder: /${TEMP_DIR_NAME}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedRows = parseTSV(fileContent);

    const products = parsedRows.slice(1).map((row, index) => {
        if (row.length < 2) return null;

        const rawDesc = row[3] || "";
        let cleanDesc = rawDesc.trim().replace(/(\r\n|\n|\r)/gm, "\n");

        // Handle Brand Name formatting
        const rawBrand = row[2] ? row[2].trim() : "Genérico";
        const cleanBrand = toTitleCase(rawBrand);

        return {
            nombre: row[1] ? row[1].trim() : "Sin Nombre",
            marca: cleanBrand, // <--- Applied Title Case here
            modelo: "", 
            categoria: "Implementos", 
            esNuevo: esNuevoValue, 
            anio: null,
            ids_imagenes: [], 
            descripcion: cleanDesc
        };
    }).filter(p => p !== null);

    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));

    console.log(`   -----------------------------------`);
    console.log(`✅ Conversion Successful!`);
    console.log(`📊 Products: ${products.length}`);
    console.log(`💾 JSON Saved: /${TEMP_DIR_NAME}/${outputFileName}`);

} catch (error) {
    console.error("\n❌ Critical Error:", error.message);
    process.exit(1);
}