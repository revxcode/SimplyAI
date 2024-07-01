// import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // Menggunakan Heroicons untuk ikon

// eslint-disable-next-line react/prop-types
function Header({ toggleHelpPopup, toggleDarkMode, darkMode }) {
  return (
    <div className="flex items-center justify-between bg-indigo-600 dark:bg-indigo-500 px-4 py-2 z-10">
      <h1 className="text-lg font-semibold text-white flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="text-2xl font-bold">SimplyAI</span>
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleHelpPopup}
          className="text-gray-400 hover:text-white focus:outline-none z-20"
        >
          <img
            src="https://img.icons8.com/?size=100&id=646&format=png&color=000000"
            className="h-5 w-5"
            alt="Help Icon"
          />
        </button>
        <button
          onClick={toggleDarkMode}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
