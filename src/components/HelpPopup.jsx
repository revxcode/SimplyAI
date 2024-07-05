import { XCircle } from "lucide-react";

// eslint-disable-next-line react/prop-types
function HelpPopup({ toggleHelpPopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative md:max-w-3xl mx-2 w-full min-h-64 bg-zinc-100 dark:bg-zinc-900 z-10 rounded-md duration-200 shadow-md">
        <button
          className="absolute top-0 right-0 p-4"
          onClick={toggleHelpPopup}
        >
          <XCircle className="w-6 h-6 text-zinc-500" />
        </button>
        <div className="p-8">
          <h2 className="md:text-3xl text-2xl font-semibold text-blue-500 dark:text-yellow-500 font-bebasneue tracking-wider">
            How to use
          </h2>
          <ul className="w-full list-inside text-zinc-700 dark:text-zinc-300 mt-2 font-montserrat text-sm md:text-base">
            <li className="list-disc">
              <span className="font-semibold">
                Type a message in the input box{" "}
              </span>
              and click the Send button
            </li>
            <li className="list-disc">
              <span className="font-semibold">
                The AI will respond in real-time{" "}
              </span>
              and display the response in the output box
            </li>
            <li className="ml-6">
              <span className="font-bold">
                You can also use the shortcuts:{" "}
              </span>
              <ul className="list-inside text-zinc-700 dark:text-zinc-300 mt-2 font-montserrat text-xs md:text-sm">
                <li className="list-disc">Enter : (for Send)</li>
                <li className="list-disc">Shift + Enter : (for New Lines)</li>
                <li className="list-disc">
                  Ctrl + Backspace : (for Delete Lines)
                </li>
              </ul>
            </li>
          </ul>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default HelpPopup;
