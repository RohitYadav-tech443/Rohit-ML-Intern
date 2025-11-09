import { chunkText, cleanText } from "./textUtils.js";

/**
 * Splits cleaned text into chunks using the selected strategy.
 * 
 * Strategies:
 * - "fixed":  splits text into fixed-size chunks (default 500 chars)
 * - "sentence": splits by sentence boundaries (. ! ?)
 *
 * @param {string} text - The input text to be chunked
 * @param {string} strategy - The chunking strategy ("fixed" | "sentence")
 * @returns {string[]} Array of text chunks
 */
export const applyChunking = (text, strategy = "fixed") => {
  if (!text || typeof text !== "string") {
    throw new Error("❌ Invalid text input for chunking");
  }

  // Always clean the text before splitting
  const cleanedText = cleanText(text);

  if (strategy === "fixed") {
    // Fixed-length chunks (default: 500 chars)
    return chunkText(cleanedText, 500);
  }

  if (strategy === "sentence") {
    // Sentence-based chunks (split by punctuation + space)
    return cleanedText
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  // Default fallback: return as single chunk
  return [cleanedText];
};
