import { create } from "zustand";

export const useUserPromptStore = create((set) => ({
    userInput: "",
    setUserInput: (value) => set({ userInput: value })
}));