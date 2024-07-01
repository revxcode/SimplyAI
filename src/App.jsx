import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Groq from "groq-sdk";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpPopup from "@/components/HelpPopup";

// eslint-disable-next-line no-unused-vars
const APP_URL = import.meta.env.APP_URL || "http://localhost:5173/";
const API_KEY = import.meta.env.VITE_APP_GROOQ_API_TOKEN;

const groq = new Groq({
  apiKey: API_KEY || "",
  dangerouslyAllowBrowser: true,
});

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [optimisticMessage, setOptimisticMessage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
  const [isTyping, setIsTyping] = useState(false);

  const model = "llama3-8b-8192";

  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, optimisticMessage, isTyping]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // chatContainerRef.current.scrollTop =
      //   chatContainerRef.current.scrollHeight;

      // Scroll to bottom smoothly
      chatContainerRef.current.scroll({
        top: chatContainerRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") {
      return;
    }

    const newMessage = { role: "user", content: inputMessage };
    setOptimisticMessage(newMessage);
    setInputMessage("");
    setIsTyping(true);

    try {
      const chatCompletion = await getGroqChatCompletion(inputMessage);
      const response = chatCompletion.choices[0]?.message?.content || "";

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        newMessage,
        { role: "groq", content: response },
      ]);

      setOptimisticMessage(null);
      setIsTyping(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
      setOptimisticMessage(null);
      setIsTyping(false);
    }
  };

  const getGroqChatCompletion = async (message) => {
    return await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: model,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const toggleHelpPopup = () => {
    setShowHelpPopup(!showHelpPopup);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // eslint-disable-next-line react/prop-types
  const MarkdownRender = ({ children }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-2">{children}</h1>
          ),
          p: ({ children }) => (
            <p className="text-gray-900 dark:text-gray-100">{children}</p>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                if (!href.startsWith("http")) {
                  e.preventDefault();
                }
              }}
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <div className="relative">
              <CopyToClipboard text={children}>
                <button className="absolute right-0 top-0 mt-2 mr-2 p-1 bg-gray-200 dark:bg-gray-900 hover:opacity-50 border rounded active:border-indigo-300 active:outline-none">
                  Copy
                </button>
              </CopyToClipboard>
              <pre className="bg-gray-200 dark:bg-gray-900 p-2 rounded py-4 px-2 my-2 text-wrap">
                <code>{children}</code>
              </pre>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    );
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
      <Header
        toggleHelpPopup={toggleHelpPopup}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <div
        className="flex-grow overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900 duration-200"
        ref={chatContainerRef}
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              message.role === "user"
                ? "bg-indigo-300 dark:bg-indigo-600  text-gray-100 dark:text-gray-100 self-end animate-slide-in-right px-4"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start animate-slide-in-left"
            }`}
          >
            <MarkdownRender>{message.content}</MarkdownRender>
          </div>
        ))}
        {optimisticMessage && (
          <div className="my-2 p-2 rounded-lg bg-indigo-300 dark:bg-indigo-600 text-gray-800 dark:text-gray-200 self-end animate-slide-in-right">
            <MarkdownRender>{optimisticMessage.content}</MarkdownRender>
          </div>
        )}
        {isTyping && (
          <div className="my-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start animate-slide-in-left">
            <p>AI is typing...</p>
          </div>
        )}
        {error && (
          <div className="my-2 p-2 rounded-lg bg-red-100 text-red-900 self-start">
            <p>{error}</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-100 dark:bg-gray-900">
        <div className="relative flex items-center">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-4 pr-28 py-2 border-none rounded-lg resize-none outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out hidden-scrollbar"
            placeholder="Type your message here..."
            autoFocus
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="absolute right-2 flex items-center justify-center text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out bg-indigo-600 hover:bg-indigo-700 focus:outline-none shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h6m0 0l3-3m-3 3l3 3m7-3h6m-6 0l3-3m-3 3l3 3"
              />
            </svg>
            Send
          </button>
        </div>
      </div>
      {showHelpPopup && <HelpPopup toggleHelpPopup={toggleHelpPopup} />}
      <Footer />
    </div>
  );
}

export default App;
