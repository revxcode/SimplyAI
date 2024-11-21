import { Navigation } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { chatGenConversation } from "@/utils/gemini2";
import DeviceType from "@/utils/media-query";

const UserInput = ({ setIsConversations }) => {
    const textareaRef = useRef(null);
    const [userInput, setUserInput] = useState();
    const { isMobile } = DeviceType();

    const handleSendMessage = useCallback(async () => {
        if (!userInput) return;

        setIsConversations((prev) => [
            ...prev,
            {
                role: "user",
                content: userInput
            }
        ]);

        setUserInput("");

        try {
            const response = await chatGenConversation({ content: userInput });

            setIsConversations((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response
                }
            ]);
        } catch (error) {
            console.error(error);
        }
    }, [userInput, setIsConversations]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        const handleKeyDown = (event) => {
            if (event.key.match(/[a-zA-Z0-9\s]{1}$/) && !event.ctrlKey && !event.altKey && !event.metaKey) {
                textareaRef.current.focus();
            }
            if (event.key === "Enter" && !event.shiftKey && userInput && !isMobile) {
                event.preventDefault();
                handleSendMessage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [userInput, isMobile, handleSendMessage]);

    return (
        <div className="flex w-full items-center justify-between duration-200 z-20 p-2">
            <div className="w-full md:max-w-3xl mx-auto bg-zinc-800 rounded-xl">
                <div className="flex p-2">
                    <textarea
                        ref={textareaRef}
                        id="userMessage"
                        className="w-full bg-inherit resize-none border-none outline-none pl-2 pr-4 h-full max-h-40"
                        placeholder="Type your message here..."
                        autoFocus
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    ></textarea>
                    <button
                        type="button"
                        className="pr-4"
                        onClick={userInput ? handleSendMessage : null}
                    >
                        <Navigation className={"w-6 h-6 duration-200 " + (userInput ? "stroke-emerald-500" : "stroke-zinc-500")} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserInput;