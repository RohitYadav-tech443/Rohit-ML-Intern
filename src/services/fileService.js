import fs from "fs";
import { parsePDF } from "../utils/pdfParser.js";
import {cleanText} from "../utils/textUtils.js";

export const extractText = async (filePath, originalName) => {
  try {
    console.log("📂 File path received:", filePath);

    // Use the original filename to determine type
    const lowerName = originalName.toLowerCase();

    if (lowerName.endsWith(".pdf")) {
      const text = await parsePDF(filePath);
      console.log("📘 PDF parsed successfully.");
      return cleanText(text);
    } 
    else if (lowerName.endsWith(".txt")) {
      const text = fs.readFileSync(filePath, "utf8");
      console.log("📄 TXT file read successfully.");
      return cleanText(text);
    } 
    else {
      console.error("❌ Unsupported file type detected for:", filePath);
      throw new Error("Unsupported file type");
    }
  } catch (err) {
    console.error("❌ Error while extracting text:", err.message);
    throw new Error("Failed to extract text");
  }
};
