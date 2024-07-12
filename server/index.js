/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";
// import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

// GEMINI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log(GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat({
	history: [],
	generationConfig: {
		maxOutputTokens: 500,
	},
});

app.post("/api/gemini", async (req, res) => {
	try {
		const result = await chat.sendMessageStream(req.body.content);
		const response = await result.response;
		const text = response.text();

		res.json({ text });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// // ANTHROPIC
// const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
// // console.log(ANTHROPIC_API_KEY);
// const anthropic = new Anthropic({
// 	apiKey: ANTHROPIC_API_KEY,
// });

// app.post("/api/anthropic", async (req, res) => {
// 	try {
// 		const result = await anthropic.messages.create({
// 			model: "claude-3-5-sonnet-20240620",
// 			max_tokens: 1000,
// 			messages: [{ role: "user", content: req.body.content }],
// 		});
// 		console.log(result);
// 		// res.json({ text: msg });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
