/* eslint-disable no-undef */
import { HfInference } from "@huggingface/inference";

const HF_TOKEN = import.meta.env.VITE_APP_HF_API_TOKEN;

const inference = new HfInference(HF_TOKEN);

export const ReqToGpt2 = async (content) => {
	const response = await inference.textGeneration({
		model: "EleutherAI/gpt-neo-2.7B",
		inputs: content,
		parameters: {
			max_new_tokens: 500,
			temperature: 0.7,
		},
	});

	// console.log(response
	return response.generated_text;
};
