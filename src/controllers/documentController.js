import { extractText } from "../services/fileService.js";
import { applyChunking } from "../utils/chunkStrategies.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import { saveMetadata } from "../services/dbService.js";

export const uploadDocument = async (req, res) => {
  try {
    // Safety check for Multer upload
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Please attach a PDF or TXT file." });
    }

    // Safely access chunkStrategy (prevents destructuring crash)
    const chunkStrategy = req.body?.chunkStrategy || "fixed";

    console.log("📥 File received:", req.file.originalname);
    console.log("🧠 Using chunkStrategy:", chunkStrategy);

    const filePath = req.file.path;

    // Extract text (PDF or TXT)
    const text = await extractText(req.file.path,req.file.originalname); // Pass full file object (so mimetype is available)
    console.log("📄 Extracted text length:", text.length);

    // Chunk text for embeddings
    const chunks = applyChunking(text, chunkStrategy);
    console.log("🧩 Generated chunks:", chunks.length);

    // Generate vector embeddings
    const vectorIds = await generateEmbeddings(chunks);
    console.log("📊 Created embeddings with IDs:", vectorIds.length);

    // Save metadata in DB
    await saveMetadata(req.file.originalname, vectorIds, chunkStrategy);
    console.log("💾 Metadata saved successfully.");

    // Respond success
    res.status(200).json({ message: "✅ Document processed successfully" });
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    res.status(500).json({ error: "Processing failed" });
  }
};
