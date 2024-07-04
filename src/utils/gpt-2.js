/* eslint-disable no-undef */
import { HfInference } from "@huggingface/inference";

const HF_TOKEN =
	import.meta.env.VITE_APP_HF_API_TOKEN ||
	process.env.VITE_APP_GROOQ_API_TOKEN;

const inference = new HfInference(HF_TOKEN);

export const ReqToGpt2 = async (content) => {
	const response = await inference.chatCompletion({
		model: "mistralai/Mistral-7B-Instruct-v0.2",
		messages: [
			{
				role: "user",
				content,
			},
		],
		max_tokens: 500,
	});

	// return response.choices[0].message.content;
	return response.choices[0].message.content;
};
