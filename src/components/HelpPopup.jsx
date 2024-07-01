function HelpPopup({ toggleHelpPopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg z-30 w-11/12 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Help</h2>
        <ul className="list-disc pl-5">
          <li className="mb-1">Type your message in the input area.</li>
          <li className="mb-1">Press "Send" or Enter to send your message.</li>
          <li className="mb-1">Use the "Copy" button to copy code snippets.</li>
          <li className="mb-1">
            Toggle dark mode using the moon/sun icon in the header.
          </li>
          <li className="mb-1">
            Scroll up to view previous messages in the chat history.
          </li>
        </ul>
        <button
          onClick={toggleHelpPopup}
          className="mt-4 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HelpPopup;
