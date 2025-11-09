/**
 * Cleans and normalizes text extracted from PDFs or other documents.
 * - Removes extra whitespace
 * - Replaces line breaks with spaces
 * - Strips unnecessary symbols
 * - Trims trailing spaces
 *
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned and normalized text
 */
export const cleanText = (text) => {
  if (!text) return "";
  return text
    .replace(/\r?\n|\r/g, " ")   
    .replace(/\s+/g, " ")        
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
};

/**
 * Splits text into smaller chunks by character length (default: 1000 chars).
 * Useful before generating embeddings.
 *
 * @param {string} text - The cleaned text
 * @param {number} size - Max chunk size (default 1000)
 * @returns {string[]} - Array of text chunks
 */
export const chunkText = (text, size = 1000) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
};

/**
 * Counts word occurrences — optional utility for analytics or debugging.
 *
 * @param {string} text - Any text
 * @returns {number} - Total words
 */
export const countWords = (text) => {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
};
