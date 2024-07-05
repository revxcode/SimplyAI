import {
	CircleArrowUp,
	Clock,
	XCircle,
	Trash2,
	MessageCircleOff,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ReqToGroq } from "@/utils/groq";
import { MDRender } from "./MDRender";

export default function Home() {
	const [conversationHistory, setConversationHistory] = useState([]);
	const [isSending, setIsSending] = useState(false);
	const [showFakeButton, setShowFakeButton] = useState(false);

	const textareaRef = useRef(null);
	const chatContainerRef = useRef(null);
	const fakeButtonTimeoutRef = useRef(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"; // Reset height
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, []);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTo({
				top: chatContainerRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [conversationHistory]);

	const handleSubmit = async () => {
		const textarea = document.getElementById("inputContent");
		const inputValue = textarea.value.trim();

		if (!inputValue) return;

		const newMessage = {
			role: "user",
			content: inputValue,
			optimistic: true,
		};

		setIsSending(true);
		setConversationHistory((prevHistory) => [...prevHistory, newMessage]);

		textarea.value = "";

		try {
			const aiResponse = await ReqToGroq(inputValue);

			setTimeout(() => {
				setConversationHistory((prevHistory) =>
					prevHistory.map((message) =>
						message === newMessage
							? { ...message, optimistic: false }
							: message,
					),
				);

				setConversationHistory((prevHistory) => [
					...prevHistory,
					{
						role: "assistant",
						content: aiResponse,
					},
				]);

				setIsSending(false);
				setShowFakeButton(false); // Hapus tombol palsu setelah selesai
			}, 2000);
		} catch (error) {
			console.error(error);
			setIsSending(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleFakeButtonClick = () => {
		setShowFakeButton(true);
		fakeButtonTimeoutRef.current = setTimeout(() => {
			setShowFakeButton(false);
			handleSubmit();
		}, 1000);
	};

	const handleCancelButtonClick = () => {
		clearTimeout(fakeButtonTimeoutRef.current);
		setShowFakeButton(false);
	};

	const showLoadingButton = isSending || showFakeButton;

	return (
		<section className="w-full h-[90vh] flex items-center justify-center">
			<div className="max-w-7xl w-full h-full mx-auto md:p-4 flex flex-col">
				<div
					ref={chatContainerRef}
					className="relative flex-1 overflow-y-auto p-2 pt-10 md:p-4 rounded-lg space-y-4"
				>
					{conversationHistory.map((message, index) => (
						<div
							key={index}
							className={`flex items-start ${
								message.role === "user"
									? "flex-row-reverse animate-slide-in-right"
									: "animate-slide-in-left"
							}`}
						>
							<img
								src={
									message.role === "user"
										? "https://robohash.org/" + message.role
										: "https://robohash.org/" + message.role
								}
								alt={message.role}
								className={
									"md:w-10 md:h-10 h-8 w-8 rounded-full border-2 " +
									(message.role === "user"
										? "ml-1 border-blue-500 md:block hidden"
										: "mr-1 border-blue-500 dark:border-yellow-500 md:block hidden")
								}
							/>
							<div
								className={`max-w-xs ${
									message.role === "user"
										? "bg-blue-500 dark:bg-blue-600 text-white overflow-auto md:px-4 pl-4 pr-2 rounded-2xl rounded-tr-none ml-4"
										: "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white overflow-auto px-3 rounded-2xl rounded-tl-none ml-2 mr-4"
								}  md:max-w-2xl relative duration-200`}
							>
								<MDRender>{message.content}</MDRender>
								{message.optimistic && (
									<Clock className="absolute bottom-1 right-3 w-4 h-4 dark:text-zinc-100 animate-spin" />
								)}
							</div>
						</div>
					))}
					{conversationHistory.length > 0 ? (
						<div className="absolute p-2 right-4">
							<button
								onClick={() => {
									setConversationHistory([]);
									document.getElementById(
										"inputContent",
									).value = "";
								}}
							>
								<Trash2 className="md:h-5 md:w-5 h-4 w-4 text-red-500" />
							</button>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center h-full md:gap-4">
							<MessageCircleOff className="w-1/3 h-1/3 text-zinc-200 dark:text-zinc-800" />
							<span className="font-extrabold md:text-2xl text-xl text-zinc-300 dark:text-zinc-700">
								Start by asking me something
							</span>
						</div>
					)}
				</div>
				<form className="relative flex items-center justify-center w-full mx-auto pt-2 px-4">
					<textarea
						ref={textareaRef}
						id="inputContent"
						type="text"
						className="relative w-full max-h-36 rounded-2xl outline-none border-none pl-4 pr-14 hidden-scrollbar resize-none bg-zinc-200 dark:bg-zinc-950 text-black dark:text-white duration-200"
						placeholder="Ask me anything..."
						onKeyDown={handleKeyDown}
						style={{
							paddingTop: "10px",
							paddingBottom: "10px",
						}} // Sesuaikan sesuai kebutuhan
						required
					/>
					<button
						type="button"
						onClick={handleSubmit}
						className={`absolute right-6 w-10 h-10 ${
							showLoadingButton
								? "bg-zinc-400"
								: "bg-zinc-300 dark:bg-zinc-700"
						} rounded-full flex items-center justify-center group`}
						disabled={showLoadingButton}
					>
						{!showLoadingButton ? (
							<CircleArrowUp
								className={`${
									isSending
										? "text-zinc-700 dark:text-zinc-500"
										: "text-zinc-500 dark:text-zinc-300"
								} w-8 h-8 group-hover:text-zinc-700 dark:group-hover:text-zinc-100 duration-200`}
							/>
						) : (
							<XCircle className="w-5 h-5 text-red-500" />
						)}
					</button>
					<button
						className="absolute inset-0 w-10 h-10 bg-transparent rounded-full"
						onClick={handleFakeButtonClick}
						onMouseDown={handleCancelButtonClick}
						disabled={isSending}
					/>
				</form>
			</div>
		</section>
	);
}
