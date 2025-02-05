import { GoogleGenerativeAI } from "@google/generative-ai";
import { useConversationHistory } from "@/stores/storeConversationHistorys";
// import recentConversations from "../assets/conversations.json"

const API_KEY = import.meta.env.VITE_APP_GEMINI_API_TOKEN || process.env.VITE_APP_GEMINI_API_TOKEN;

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
            history: [...userConversations],
        });

        const result = await chat.sendMessage(content);
        // console.log(result.response.text());
        return result.response.text();
    }

    const textGenUsingAPI = async ({ content }) => {
        const response = await fetch("http://localhost:3100/api/v1/gemini", {
            method: "POST",
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.zGVgjJnBme3R_C8ncrFbr5PFUz95SaAxgxg6MC8AjiE`,
                "x-api-key": "AIzaSyADleiMoz3Md45VWPGvX6CfzO45m-bUehw",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                prompt: content,
            }),
        });

        const result = await response.json();
        return result.parts[0].text
    }


    return { textGenTextOnlyPrompt, chatGenConversation, textGenUsingAPI };
}
