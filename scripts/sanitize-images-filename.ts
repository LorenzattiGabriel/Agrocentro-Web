
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
 * Recursively scans a directory and its subdirectories, renaming files that contain spaces.
 * @param targetDir The absolute path to the directory to scan.
 * @returns The number of files that were renamed.
 */
const sanitizeFilesInDir = (targetDir: string): number => {
  console.log(`🔍 Scanning for files with spaces in: ${targetDir}`);
  try {
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Error: Directory not found. Please make sure this path is correct: "${targetDir}"`);
      return 0;
    }

    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    let filesRenamedCount = 0;

    entries.forEach((entry) => {
      const oldPath = path.join(targetDir, entry.name);
      if (entry.isDirectory()) {
        // If it's a directory, recurse into it.
        filesRenamedCount += sanitizeFilesInDir(oldPath);
      } else if (entry.isFile() && entry.name.includes(' ')) {
        // If it's a file and contains a space, rename it.
        const newFileName = sanitizeFilename(entry.name);
        const newPath = path.join(targetDir, newFileName);

        if (fs.existsSync(newPath)) {
          console.warn(`⚠️  Skipping rename for "${entry.name}": A file named "${newFileName}" already exists.`);
          return;
        }

        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renamed: "${entry.name}"  ->  "${newFileName}"`);
        filesRenamedCount++;
      }
    });

    return filesRenamedCount;
  } catch (error) {
    console.error(`\nAn unexpected error occurred in ${targetDir}:`, error);
    return 0;
  }
};

const run = () => {
  const subfolders = process.argv.slice(2);

  if (subfolders.length === 0) {
    console.log('ℹ️  Usage: Provide one or more sub-paths within the /public directory to scan recursively.');
    console.log('   Example: npx tsx scripts/sanitize-images-filename.ts images/products media/videos');
    return;
  }

  const publicRoot = path.resolve(__dirname, '..', 'public');
  let totalFilesRenamed = 0;

  console.log('-----------------------------------------');
  subfolders.forEach((subfolder) => {
    const fullPath = path.join(publicRoot, subfolder);
    const filesRenamedCount = sanitizeFilesInDir(fullPath);
    totalFilesRenamed += filesRenamedCount;
    if (filesRenamedCount > 0) {
      console.log(`✨ Renamed ${filesRenamedCount} file(s) in ${subfolder}.`);
    } else {
      console.log(`👍 No files with spaces were found in ${subfolder}.`);
    }
    console.log('-----------------------------------------');
  });

  if (totalFilesRenamed > 0) {
    console.log(`\n🎉 Successfully renamed a total of ${totalFilesRenamed} file(s).`);
  } else {
    console.log('\n👍 No files with spaces were found in any of the provided paths.');
  }
};

// Run the script
run();
/*
    if (filesRenamedCount > 0) {
      console.log(`\n✨ Successfully renamed ${filesRenamedCount} file(s).`);
    } else {
      console.log('\n👍 No files with spaces were found. All good!');
    }
  } catch (error) {
    console.error('\nAn unexpected error occurred:', error);
  }
*/
