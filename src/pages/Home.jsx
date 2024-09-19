import { useState, useEffect, useRef } from "react"
import { useGeminiAI } from "@/utils/gemini"
import { MdRender } from "@/components/MdRender"
import { CircleArrowUp, Clock, Trash2 } from "lucide-react"
import { useConversationHistorys } from "@/stores/StoreConversationHistorys"
import { saveConversation } from "@/utils/indexedDb"

export default function Home() {
	const { conversationHistory, setConversationHistory } = useConversationHistorys()
	const [isSending, setIsSending] = useState(false)
	const [showFakeButton, setShowFakeButton] = useState(false)
	const generateResponse = useGeminiAI()

	const textareaRef = useRef(null)
	const chatContainerRef = useRef(null)
	const fakeButtonTimeoutRef = useRef(null)

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}

	}, [setConversationHistory])

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTo({
				top: chatContainerRef.current.scrollHeight,
				behavior: "smooth",
			})
		}
	}, [conversationHistory])

	const handleSubmit = async (value) => {
		const textarea = document.getElementById("inputContent")
		const inputValue = value || textarea.value

		if (!inputValue) return

		const newMessage = {
			role: "user",
			content: inputValue,
			optimistic: true,
		}

		const assistantPendingMessage = {
			role: "assistant",
			content: "",
			optimistic: true,
		}

		setIsSending(true)
		setConversationHistory([...conversationHistory, newMessage, assistantPendingMessage])

		textarea.value = ""

		try {
			const assistantResponse = await generateResponse(inputValue)

			if (assistantResponse) {
				setConversationHistory([
					...conversationHistory,
					newMessage,
					{
						role: "assistant",
						content: assistantResponse,
					},
				])

				saveConversation({ newMessage, assistantResponse })

			}
			setIsSending(false)
			setShowFakeButton(false) // Hapus tombol palsu setelah selesai
		} catch (error) {
			console.error(error)
			setIsSending(false)
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSubmit()
		}
	}

	const handleFakeButtonClick = () => {
		setShowFakeButton(true)
		fakeButtonTimeoutRef.current = setTimeout(() => {
			setShowFakeButton(false)
			handleSubmit()
		}, 1000)
	}

	const handleCancelButtonClick = () => {
		clearTimeout(fakeButtonTimeoutRef.current)
		setShowFakeButton(false)
	}

	const showLoadingButton = isSending || showFakeButton

	return (
		<section className="w-full h-full flex items-center justify-center pt-16 pb-8">
			<div className="max-w-7xl w-full h-full mx-auto flex flex-col">
				<div ref={chatContainerRef} className="relative flex-1 overflow-y-auto px-2 rounded-lg overflow-x-hidden">
					{conversationHistory.map((message, index) => (
						<div
							key={index}
							className={`flex items-start ${message.role === "user"
								? "md:flex-row-reverse animate-slide-in-right"
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
									"md:w-10 md:h-10 h-8 w-8 rounded-full border-2 md:block hidden " +
									(message.role === "user"
										? "ml-1 border-zinc-200 dark:border-zinc-800"
										: "mr-1 border-zinc-500 dark:border-purple-600")
								}
							/>
							<div
								className={`max-w-full ${message.role === "user"
									? "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white overflow-auto md:px-4 pl-4 pr-2 rounded-lg md:rounded-tl-2xl md:rounded-tr-none md:ml-4 py-1 mx-1"
									: "bg-inherit dark:bg-bg-inherit text-black dark:text-white overflow-auto px-3 rounded-2xl md:rounded-tl-none md:ml-2 md:mr-4"
									} mt-4 w-full md:max-w-2xl md:w-fit relative duration-200`}
							>
								<div className={"w-full h-10 " + (message.role === "assistant" && message.optimistic ? 'block' : 'hidden')}>
									<div className="waiting-animation"></div>
								</div>
								<MdRender>{message.content}</MdRender>
							</div>
						</div>
					))}
					{conversationHistory.length > 0 ? (
						<div className="">
							<button
								onClick={() => {
									setConversationHistory([])
									document.getElementById("inputContent").value = ""
								}}
							>
								<Trash2 className="md:h-5 md:w-5 h-4 w-4 text-red-500 mb-20" />
							</button>
						</div>
					) : (
						<div className="flex items-center justify-center h-full md:gap-4">
							<button
								type="button"
								className="w-full px-4 md:max-w-xs h-28 bg-gradient-to-tr from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-zinc-700 dark:text-purple-600 rounded-xl md:rounded-lg flex items-center justify-center duration-300 mx-10"
								onClick={() => handleSubmit("Hallo SimplyAI")}
							>
								Welcome to SimplyAI
							</button>
						</div>
					)}
				</div>
				<form className="fixed bottom-8 left-0 right-0 flex items-center justify-center w-full mx-auto md:px-20 px-4 z-20">
					<textarea
						ref={textareaRef}
						id="inputContent"
						type="text"
						className="relative w-full h-auto min-h-12 rounded-2xl outline-none border-none pl-4 pr-14 py-3 hidden-scrollbar resize-none bg-zinc-200 dark:bg-zinc-950 text-black dark:text-white duration-200 valid:min-h-36"
						placeholder="Ask me anything..."
						onKeyDown={handleKeyDown}
						pattern="[A-Za-z0-9]+"
						required
					/>

					<button
						type="button"
						onClick={() => handleSubmit(document.getElementById("inputContent").value)}
						className={`absolute right-6 md:right-24 w-10 h-10 ${showLoadingButton ? "bg-zinc-400 dark:bg-zinc-900" : "bg-zinc-300 dark:bg-zinc-700"
							} rounded-full flex items-center justify-center group`}
						disabled={showLoadingButton}
					>
						{!showLoadingButton ? (
							<CircleArrowUp
								className={`${isSending ? "text-zinc-700 dark:text-zinc-500" : "text-zinc-500 dark:text-zinc-300"
									} w-8 h-8 group-hover:text-zinc-700 dark:group-hover:text-zinc-100 duration-200 rotate-90`}
							/>
						) : (
							<Clock className="w-8 h-8 text-zinc-600 cursor-wait animate-spin" />
						)}
					</button>
					<button
						className="absolute inset-0 w-10 h-10 bg-transparent rounded-full"
						onClick={handleFakeButtonClick}
						onMouseDown={handleCancelButtonClick}
						disabled={isSending}
					/>
				</form>
				<div className="flex items-center w-full justify-center py-2">
					<span className="text-zinc-500 md:text-xs text-[10px] tracking-wider">
						SimplyAI may have made an error, please double check the response.
					</span>
				</div>
			</div>
		</section>
	)
}
