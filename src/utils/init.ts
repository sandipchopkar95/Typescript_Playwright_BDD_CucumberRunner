const fs = require("fs-extra");

(async () => {
  try {
    await fs.ensureDir("test-result");  // Ensure the directory exists
    await fs.emptyDir("test-result");   // Clear contents if any
    console.log("Folder ensured and emptied: test-result");
  } catch (error) {
    console.error("Error handling 'test-result' folder:", error);
  }
})();
