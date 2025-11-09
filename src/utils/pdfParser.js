import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule; // ✅ Fix for CJS/ESM mismatch

/**
 * Extract text content from a PDF file.
 * @param {string} filePath - The path to the PDF file.
 * @returns {Promise<string>} - The extracted text content.
 */
export const parsePDF = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const dataBuffer = fs.readFileSync(filePath);

    // Safely handle the correct function reference
    const pdfData = await pdfParse(dataBuffer);

    const cleanText = pdfData.text.replace(/\s+/g, " ").trim();
    return cleanText;
  } catch (error) {
    console.error("❌ Error while parsing PDF:", error.message);
    throw new Error("Failed to extract text from PDF");
  }
};
