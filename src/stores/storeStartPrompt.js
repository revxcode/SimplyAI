import { create } from "zustand";

export const useStoreStartPrompt = create((set) => ({
    startPrompts: [
        {
            title: "Start a new conversation",
            icon: "🚀",
        },
        {
            title: "View previous conversation",
            icon: "📖",
        },
        {
            title: "Help",
            icon: "❓",
        },
    ],
    isConversations: [],
    isLoading: false,
    setIsConversations: (isConversations) => set({ isConversations }),
    setIsLoading: (isLoading) => set({ isLoading }),
}))