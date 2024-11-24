import Header from "@/components/Header";
import MarkdownRender from "@/components/MarkdownRender";
import UserInput from "@/components/UserInput";
import { Eaching } from "@/utils/eaching";
import { useEffect, useRef, useState } from "react";
import { BookText, CircleHelp, FileLineChart, Fingerprint, MessageCircleQuestion, Languages } from "lucide-react"
import { useUserPromptStore } from "@/stores/storeUserPrompt";
import { useConversationHistory } from "@/stores/storeConversationHistorys";

function NewHome() {
    const containerRef = useRef(null);
    const { conversationHistorys } = useConversationHistory();
    const [isLoading, setIsLoading] = useState(false);
    const { setUserInput } = useUserPromptStore();

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [conversationHistorys]);

    const startPrompts = [
        {
            title: "Summarize",
            content: "Summarize the text",
            icon: <BookText className="w-6 h-6 aspect-square stroke-red-400" />,
        },
        {
            title: "Translate",
            content: "Translate the text to English",
            icon: <Languages className="w-6 h-6 aspect-square stroke-blue-400" />,
        },
        {
            title: "Sentiment",
            content: "Analyze the sentiment of the text",
            icon: <FileLineChart className="w-6 h-6 aspect-square stroke-green-400" />,
        },
        {
            title: "Question",
            content: "Ask a question about the text",
            icon: <MessageCircleQuestion className="w-6 h-6 aspect-square stroke-yellow-400" />,
        },
        {
            title: "Help",
            content: "Get help on how to use SimplyAI",
            icon: <CircleHelp className="w-6 h-6 aspect-square stroke-purple-400" />,
        },
    ]

    return (
        <div className="flex flex-col w-full h-dvh">
            <div ref={containerRef} className="flex flex-col h-full w-full overflow-y-auto mt-20 pb-16">
                <Header />
                <div className="relative w-full md:max-w-3xl mx-auto px-2">
                    {conversationHistorys.length === 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-4 translate-y-52">
                            <Eaching
                                of={startPrompts}
                                render={(item) => (
                                    <button
                                        type="button"
                                        className="flex border border-zinc-600 px-4 py-2 rounded-full gap-2 text-zinc-300 hover:text-white duration-200"
                                        onClick={() => setUserInput(item.content)}
                                    >
                                        {item.icon}{item.title}
                                    </button>
                                )}
                            />
                        </div>
                    )}
                    <Eaching
                        of={conversationHistorys}
                        render={(item) => {
                            return item.role === "user" ? (
                                <div className="flex flex-row-reverse mb-8">
                                    <div className="w-fit md:max-w-xl max-w-xs py-2 px-4 rounded-xl bg-zinc-800">
                                        <div className="whitespace-pre-wrap">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-row mb-8">
                                        <img src="https://robohash.org/assistant" alt="AI" className="w-10 h-10 aspect-square rounded-full" />
                                        <div className="w-full mt-4 px-2">
                                            <MarkdownRender markdown={item.content} />
                                        </div>
                                    </div>
                                </>
                            )
                        }}
                    />
                    {isLoading &&
                        <div className="loading-animation flex relative w-[100%] max-w-xs h-2 bg-zinc-800 rounded-full my-2">
                            <div className="w-0 h-full bg-emerald-500 rounded-full rounded-r-none"></div>
                            <Fingerprint className="relative -top-2 stroke-emerald-500" />
                        </div>
                    }
                </div>
            </div>
            <UserInput
                setIsLoading={setIsLoading}
            />
            <span className="text-center text-sm pb-1 text-zinc-200">
                SimplyAI 2.0 can be accessed at <a href="https://simply-ai-six.vercel.app" className="text-zinc-500">SimplyAI</a>
            </span>
        </div>
    );
}

export default NewHome;