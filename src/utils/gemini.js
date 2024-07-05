/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY =
	import.meta.env.VITE_APP_GEMINI_API_TOKEN ||
	process.env.VITE_APP_GEMINI_API_TOKEN;

const gemini = new GoogleGenerativeAI(API_KEY);

export const ReqToGemini = async (content) => {
	try {
		const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

		const result = await model.generateContent(content);
		const response = result.response;
		const text = response.text();
		// console.log(result);

		return text;
	} catch (error) {
		console.log(error);
	}
};
