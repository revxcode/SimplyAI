import { GoogleGenerativeAI } from "@google/generative-ai";
import recentConversations from "../assets/conversations.json"
import { useConversationHistory } from "@/stores/storeConversationHistorys";

const API_KEY = import.meta.env.VITE_APP_GEMINI_API_TOKEN;

export const useGemini2 = () => {
    const { conversationHistorys } = useConversationHistory();
    const userConversations = conversationHistorys.map((conversation) => {
        return {
            role: conversation.role,
            parts: [{ text: conversation.content }],
        };
    });

    const textGenTextOnlyPrompt = async ({ content }) => {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

        const result = await model.generateContent(content);
        return result.response.text();
    }

    const chatGenConversation = async ({ content }) => {
        if (!content) return;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
        const chat = model.startChat({
            history: [...recentConversations, ...userConversations],
        });

        const result = await chat.sendMessage(content);
        return result.response.text();
    }

    return { textGenTextOnlyPrompt, chatGenConversation };
}