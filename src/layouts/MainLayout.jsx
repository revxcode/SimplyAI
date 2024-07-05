import { ModeToggle } from "@/components/mode-toggle";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import HelpPopup from "@/components/HelpPopup";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
	const [showHelpPopup, setShowHelpPopup] = useState(false);
	const toggleHelpPopup = () => {
		setShowHelpPopup(!showHelpPopup);
	};
	return (
		<div className="h-screen w-full flex flex-col bg-gray-100">
			<header className="bg-blue-600 text-white p-4 text-center">
				<h1 className="text-xl font-bold">Chat Bot App</h1>
			</header>
			<main className="flex-grow p-4 overflow-y-auto">
				<div className="flex flex-col items-center space-y-4">
					<div className="bg-white p-4 rounded shadow">
						<p>Welcome to the Chat Bot!</p>
					</div>
					{/* Add chat components here */}
				</div>
			</main>
			<footer className="bg-gray-800 text-white p-4 text-center">
				<p>&copy; 2024 Chat Bot App</p>
			</footer>
		</div>
	);
}
