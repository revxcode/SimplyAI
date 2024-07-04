/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Groq from "groq-sdk";

const API_KEY =
  import.meta.env.VITE_APP_GROOQ_API_TOKEN ||
  process.env.VITE_APP_GROOQ_API_TOKEN;

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ReqToGroq = async (content, model) => {
  // llama3-8b-8192
  // llama3-70b-8192
  // mixtral-8x7b-32768
  // gemma-7b-it
  // whisper-large-v3
  const defaultModel = "llama3-8b-8192";
  const response = groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: model || defaultModel,
  });

  return (await response).choices[0].message.content;
};
