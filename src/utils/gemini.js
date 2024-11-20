import { GoogleGenerativeAI } from "@google/generative-ai"
import { useConversationHistorys } from "@/stores/StoreConversationHistorys"

export const useGeminiAI = () => {
	const API_KEY = import.meta.env.VITE_APP_GEMINI_API_TOKEN
	const { conversationHistory } = useConversationHistorys()

	const generateResponse = async (content) => {
		const historys = conversationHistory.map((message) => {
			return {
				role: message.role === "user" ? "user" : "model",
				parts: [{ text: message.content }],
			}
		})

		const genAI = new GoogleGenerativeAI(API_KEY)
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" })
		const chat = model.startChat({
			history: [
				{
					role: "user",
					parts: [{ text: "Anyone who asks your name/identity, you must answer that you are SimplyAI" }],
				},
				{
					role: "model",
					parts: [{ text: "Well, I'm SimplyAI" }],
				},
				{
					role: "user",
					parts: [{ text: "If the request response is a mathematical expression that can be parsed by the remarkmath/rehypekatex plugin, add $$ math $$ to the mathematical response." }]
				},
				{
					role: "model",
					parts: [{ text: "default text $$ math response $$" }]
				},
				...historys,
			],
		})

		try {
			const result = await chat.sendMessage(content)
			const response = result.response
			const text = response.text()
			return text
		} catch (error) {
			console.error("There was a problem with the operation:", error)
		}
	}

	return generateResponse
}
