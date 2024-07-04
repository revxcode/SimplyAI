import { create } from "zustand";

export const useConversationHistory = create((set) => ({
  conversationHistory: [],
  addConversationHistory: (conversation) =>
    set((state) => ({
      conversationHistory: [...state.conversationHistory, conversation],
    })),
}));
