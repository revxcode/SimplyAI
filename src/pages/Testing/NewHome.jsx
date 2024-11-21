import Header from "@/components/Header";
import MarkdownRender from "@/components/MarkdownRender";
import UserInput from "@/components/UserInput";
import { Eaching } from "@/utils/eaching";
import { useEffect, useRef, useState } from "react";

function NewHome() {
    const [isConversations, setIsConversations] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [isConversations]);

    return (
        <div className="flex flex-col w-full h-dvh">
            <div ref={containerRef} className="flex flex-col h-full w-full overflow-y-auto mt-20 pb-16">
                <Header />
                <div className="w-full md:max-w-3xl mx-auto px-2">
                    <Eaching
                        of={isConversations}
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
                                <div className="flex flex-row mb-8">
                                    <img src="https://robohash.org/assistant" alt="AI" className="w-10 h-10 aspect-square rounded-full" />
                                    <div className="w-full mt-4 px-2">
                                        <MarkdownRender markdown={item.content} />
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
            <UserInput setIsConversations={setIsConversations} />
            <span className="text-center text-sm pb-1 text-zinc-200">
                SimplyAI 2.0 can be accessed at <a href="https://simply-ai-six.vercel.app" className="text-zinc-500">SimplyAI</a>
            </span>
        </div>
    );
}

export default NewHome;