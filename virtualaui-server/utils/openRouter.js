import axios from "axios";

export const askAI = async (messages) => {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages array is empty.");
  }

  const models = [
    "google/gemini-2.0-flash-lite-preview-v1:free",
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-2.5-flash",
    "deepseek/deepseek-chat",
  ];

  for (const model of models) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1200,
          response_format: { type: "json_object" },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "X-OpenRouter-Title": "VirtualUI",
            "Content-Type": "application/json",
          },
        }
      );

      const content = response?.data?.choices?.[0]?.message?.content;

      if (!content || !content.trim()) {
        throw new Error("AI returned empty response.");
      }

      console.log(`Success with model: ${model}`);

      return content;
    } catch (error) {
      console.error(
        `${model} failed:`,
        error.response?.data || error.message
      );

      if (model === models[models.length - 1]) {
        throw new Error(
          error.response?.data?.error?.message ||
            "All AI models failed"
        );
      }
    }
  }
};