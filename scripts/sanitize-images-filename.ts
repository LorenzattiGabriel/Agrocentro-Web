
import fs from 'fs';
import path from 'path';

/**
 * Sanitizes a filename by replacing all whitespace characters with a single hyphen.
 * @param filename The original filename.
 * @returns The sanitized filename.
 */
const sanitizeFilename = (filename: string): string => {
  // This regex replaces one or more whitespace characters (\s+) with a single hyphen.
  return filename.replace(/\s+/g, '-');
};

/**
 * Scans a directory and renames files containing spaces.
 * @param targetDir The absolute path to the directory to scan.
 */
const sanitizeFilesInDir = (targetDir: string) => {
  console.log(`🔍 Scanning for files with spaces in: ${targetDir}`);
  try {
    // 1. Check if the directory actually exists.
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Error: Directory not found. Please make sure this path is correct: "${targetDir}"`);
      return;
    }

    // 2. Read all files in the directory.
    const files = fs.readdirSync(targetDir);
    let filesRenamedCount = 0;

    // 3. Loop through each file.
    files.forEach((file) => {
      // If the file name contains a space...
      if (file.includes(' ')) {
        const oldPath = path.join(targetDir, file);
        const newFileName = sanitizeFilename(file);
        const newPath = path.join(targetDir, newFileName);

        // 4. Check if a file with the new name already exists to prevent accidental overwrites.
        if (fs.existsSync(newPath)) {
          console.warn(`⚠️  Skipping rename for "${file}": A file named "${newFileName}" already exists.`);
          return;
        }

        // 5. Rename the file.
        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renamed: "${file}"  ->  "${newFileName}"`);
        filesRenamedCount++;
      }
    });

    if (filesRenamedCount > 0) {
      console.log(`\n✨ Successfully renamed ${filesRenamedCount} file(s).`);
    } else {
      console.log('\n👍 No files with spaces were found. All good!');
    }
  } catch (error) {
    console.error('\nAn unexpected error occurred:', error);
  }
};

const run = () => {
  // Get all arguments passed after the script name (e.g., 'images/products')
  const subfolders = process.argv.slice(2);

  if (subfolders.length === 0) {
    console.log('ℹ️  Usage: Provide one or more sub-paths within the /public directory.');
    console.log('   Example: npx tsx scripts/sanitize-images-filename.ts images/products media/videos');
    return;
  }

  // The absolute path to the /public directory
  const publicRoot = path.resolve(__dirname, '..', 'public');

  console.log('-----------------------------------------');
  // Process each subfolder provided as an argument
  subfolders.forEach((subfolder) => {
    const fullPath = path.join(publicRoot, subfolder);
    sanitizeFilesInDir(fullPath);
  });
  console.log('-----------------------------------------');
};

// Run the script
run();
