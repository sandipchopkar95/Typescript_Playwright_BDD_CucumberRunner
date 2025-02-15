const fs = require("fs-extra");

async function prepareTestResultFolder(folderPath = "test-result") {
  try {
    await fs.ensureDir(folderPath);  // Ensure the directory exists
    await fs.emptyDir(folderPath);   // Clear contents if any
    console.log(`Folder ensured and emptied: ${folderPath}`);
  } catch (error) {
    console.error(`Error handling '${folderPath}' folder:`, error);
  }
}


prepareTestResultFolder();