import { getLLMResponse } from "../services/llmService.js";
import redisClient from "../config/redis.js";
import { saveBooking } from "../services/dbService.js";

export const handleConversation = async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "Missing userId or message" });
    }

    // Retrieve chat memory from Redis
    const key = `chat:${userId}`;
    const history = await redisClient.lRange(key, 0, -1);
    const context = history.join("\n");

    const prompt = `You are a helpful assistant having a conversation.Here is the previous chat:${context}User: ${message}
Assistant:
    `;

    const response = await getLLMResponse(prompt);

    // Save chat in Redis
    await redisClient.rPush(key, `User: ${message}`);
    await redisClient.rPush(key, `Assistant: ${response}`);

    res.status(200).json({ reply: response });
  } catch (error) {
    console.error("❌ Chat Error:", error.message);
    res.status(500).json({ error: "Chat failed" });
  }
};

export const bookInterview = async (req, res) => {
  try {
    const { name, email, date, time } = req.body;
    if (!name || !email || !date || !time) {
      return res.status(400).json({ error: "Missing booking details" });
    }

    const saved = await saveBooking(name, email, date, time);
    res.status(200).json({ message: "Interview booked successfully!", booking: saved });
  } catch (error) {
    console.error("❌ Booking Error:", error.message);
    res.status(500).json({ error: "Booking failed" });
  }
};
