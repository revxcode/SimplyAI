import axios from "axios";

export const ReqToGemini = async (content) => {
	try {
		const response = await axios.post(
			"http://localhost:3100/api/gemini",
			{
				content: content,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		return response.data.text;
	} catch (error) {
		console.error("There was a problem with the axios operation:", error);
	}
};
