import { GoogleGenerativeAI } from "@google/generative-ai";

export const useGeminiAI = async (content) => {
	const API_KEY = import.meta.env.VITE_APP_GEMINI_API_TOKEN;

	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const chat = model.startChat({
		history: [
			{
				role: "user",
				parts: [
					{
						text: "My name is Teguh Ersyarudin, github name revenue-official",
					},
				],
			},
		],
	});

	try {
		const result = await chat.sendMessage(content);
		const response = await result.response;
		const text = response.text();

		return text;
	} catch (error) {
		console.error("There was a problem with the axios operation:", error);
	}
};
