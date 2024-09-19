// import { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid"

// eslint-disable-next-line react/prop-types
function Header({ toggleHelpPopup }) {
  return (
    <div className="fixed flex w-full items-center justify-between bg-zinc-50 dark:bg-zinc-900 px-4 py-3 md:py-4 duration-200 z-20">
      <h1 className="text-lg font-semibold text-white flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-zinc-400 dark:text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="text-2xl font-normal font-montserrat text-zinc-400 dark:text-purple-600">
          Simply
          <span className="font-bold">AI</span>
        </span>
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleHelpPopup}
          className="text-zinc-400 dark:text-purple-600 focus:outline-none z-20"
        >
          <InformationCircleIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default Header
