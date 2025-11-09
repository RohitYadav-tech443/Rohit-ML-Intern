import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const getLLMResponse = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // free-tier compatible
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("❌ LLM Error:", error.message);
    throw new Error("Failed to generate response");
  }
};
