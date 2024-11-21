import { create } from "zustand"

export const useConversationHistorys = create((set) => ({
	conversationHistory: [],
	setConversationHistory: (history) => set({ conversationHistory: history }),
}))
