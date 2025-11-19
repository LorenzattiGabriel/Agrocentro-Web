const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
// The folder name where CSVs will be saved (in the project root)
const MANIFEST_DIR_NAME = 'import-manifests';

// --- ARGUMENTS ---
const sourceDirArg = process.argv[2];
const destDirArg = process.argv[3];

if (!sourceDirArg || !destDirArg) {
    console.error('❌ Error: Provide SOURCE and DESTINATION paths.');
    console.error('Usage: node import-images.js "./SourceFolder" "./public/TargetFolder"');
    process.exit(1);
}

const sourceDir = path.resolve(sourceDirArg);
const destDir = path.resolve(destDirArg);
const manifestsDir = path.join(process.cwd(), MANIFEST_DIR_NAME);

// --- CSV ACCUMULATOR ---
const csvRows = ['Brand,Product,Final Filename'];

// --- HELPERS ---
const sanitizeString = (str) => {
    return str.trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/\s+/g, '-')     
        .toLowerCase();           
};

const getUniquePath = (targetDir, filename) => {
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    
    let finalName = filename;
    let fullPath = path.join(targetDir, finalName);
    let counter = 1;

    while (fs.existsSync(fullPath)) {
        finalName = `${name}-${counter}${ext}`;
        fullPath = path.join(targetDir, finalName);
        counter++;
    }

    return { fullPath, finalName, wasCollision: counter > 1 };
};

// --- MAIN LOGIC ---
const runImport = () => {
    console.log(`\n🚀 STARTING IMPORT`);
    
    if (!fs.existsSync(sourceDir) || !fs.existsSync(destDir)) {
        console.error('❌ Error: Check your directories.');
        return;
    }

    // Ensure Manifest Directory exists
    if (!fs.existsSync(manifestsDir)) {
        console.log(`📁 Creating manifest folder: /${MANIFEST_DIR_NAME}`);
        fs.mkdirSync(manifestsDir);
    }

    const brandItems = fs.readdirSync(sourceDir, { withFileTypes: true });
    const brandFolders = brandItems.filter(item => item.isDirectory());

    let totalMoved = 0;

    brandFolders.forEach(brand => {
        const brandPath = path.join(sourceDir, brand.name);
        const brandPrefix = sanitizeString(brand.name);
        
        const productItems = fs.readdirSync(brandPath, { withFileTypes: true });
        const productFolders = productItems.filter(item => item.isDirectory());

        if (productFolders.length > 0) {
            console.log(`   🔹 Processing: ${brand.name}`);
        }

        productFolders.forEach(product => {
            const productPath = path.join(brandPath, product.name);
            const productPrefix = sanitizeString(product.name);
            const fullPrefix = `${brandPrefix}-${productPrefix}`;

            const files = fs.readdirSync(productPath);

            files.forEach(file => {
                const ext = path.extname(file).toLowerCase();

                if (IMAGE_EXTENSIONS.includes(ext)) {
                    const rawName = path.basename(file, ext);
                    const cleanName = sanitizeString(rawName);
                    const targetFilename = `${fullPrefix}-${cleanName}${ext}`;

                    // Check destination for collisions
                    const { fullPath, finalName } = getUniquePath(destDir, targetFilename);
                    
                    // Move the file
                    fs.renameSync(path.join(productPath, file), fullPath);

                    // Add to CSV Report
                    csvRows.push(`"${brand.name}","${product.name}","${finalName}"`);

                    totalMoved++;
                }
            });
        });
    });

    // --- WRITE CSV FILE ---
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
    
    const csvFileName = `manifest_${timestamp}.csv`;
    // Save specifically in the manifests folder
    const csvPath = path.join(manifestsDir, csvFileName);
    
    fs.writeFileSync(csvPath, csvRows.join('\n'));

    console.log(`\n=========================================`);
    console.log(`🎉 DONE! Moved ${totalMoved} images.`);
    console.log(`📄 Manifest saved: /${MANIFEST_DIR_NAME}/${csvFileName}`);
    console.log(`=========================================`);
};

runImport();