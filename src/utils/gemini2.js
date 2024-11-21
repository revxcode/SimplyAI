import { GoogleGenerativeAI } from "@google/generative-ai";
import recentConversations from "../assets/conversations.json"

const API_KEY = import.meta.env.VITE_APP_GEMINI_API_TOKEN

export const textGenTextOnlyPrompt = async ({ content }) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const result = await model.generateContent(content);
    return result.response.text();
}

export const chatGenConversation = async ({ content }) => {
    if (!content) return;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const chat = model.startChat({
        history: recentConversations
    });

    const result = await chat.sendMessage(content);
    return result.response.text();
}