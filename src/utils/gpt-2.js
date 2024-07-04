import { HfInference } from "@huggingface/inference";

const HF_TOKEN = "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";

const inference = new HfInference(HF_TOKEN);

export const ReqToGpt2 = async () => {
	// Chat completion API
	const response = await inference.chatCompletion({
		model: "mistralai/Mistral-7B-Instruct-v0.2",
		messages: [
			{
				role: "user",
				content: "berikan saya kode js sederhana",
			},
		],
		max_tokens: 500,
	});

	// return response.choices[0].message.content;
	return (await response).choices[0].message.content;
};
