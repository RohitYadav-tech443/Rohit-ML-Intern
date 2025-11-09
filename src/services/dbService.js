import mongoose from "mongoose";
import Booking from "../models/Booking.js";

// Existing Document Schema
const docSchema = new mongoose.Schema({
  name: String,
  vectorIds: [String],
  chunkStrategy: String,
  createdAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", docSchema);

// Save document metadata (existing functionality)
export const saveMetadata = async (name, vectorIds, chunkStrategy) => {
  try {
    await Document.create({ name, vectorIds, chunkStrategy });
    console.log("✅ Document metadata saved successfully!");
  } catch (error) {
    console.error("❌ Error saving document metadata:", error.message);
    throw new Error("Failed to save document metadata");
  }
};

// New: Save interview booking (for RAG)
export const saveBooking = async (name, email, date, time) => {
  try {
    const newBooking = new Booking({ name, email, date, time });
    const saved = await newBooking.save();
    console.log("✅ Booking saved successfully:", saved);
    return saved;
  } catch (error) {
    console.error("❌ Error saving booking:", error.message);
    throw new Error("Failed to save booking");
  }
};
