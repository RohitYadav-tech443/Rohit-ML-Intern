import { Pinecone } from "@pinecone-database/pinecone";

export const generateEmbeddings = async (chunks) => {
  const apiKey = process.env.PINECONE_API_KEY;

  if (!apiKey) {
    throw new Error("❌ Missing PINECONE_API_KEY in environment variables.");
  }

  // Initialize Pinecone (v2+)
  const pinecone = new Pinecone({ apiKey });

  const indexName = "document-embeddings";
  const index = pinecone.index(indexName);

  // Create dummy embeddings (simulate)
  const fakeEmbed = chunks.map(() => Array(2048).fill(Math.random()));

  // Prepare array of records
  const records = chunks.map((_, i) => ({
    id: `chunk_${i}`,
    values: fakeEmbed[i],
  }));

  console.log("🧠 Prepared", records.length, "records for upsert");

  // CORRECT Pinecone v2 syntax (expects an array)
  await index.upsert(records);

  console.log("✅ Embeddings uploaded successfully to Pinecone.");
  return records.map((r) => r.id);
};
