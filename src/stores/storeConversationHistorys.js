import { create } from "zustand"

export const useConversationHistory = create((set) => ({
	conversationHistorys: [],
	setConversationHistorys: (history) => set({ conversationHistorys: history }),
	addConversationHistory: (history) => set((state) => ({ conversationHistorys: [...state.conversationHistorys, history] })),
	clearConversationHistory: () => set({ conversationHistorys: [] }),
}))