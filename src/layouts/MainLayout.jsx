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
		<main className="w-full h-screen flex flex-col bg-zinc-100 dark:bg-zinc-900 duration-200">
			<Header toggleHelpPopup={toggleHelpPopup} />
			<ModeToggle />
			{children}
			{/*<Footer />*/}
			{showHelpPopup && <HelpPopup toggleHelpPopup={toggleHelpPopup} />}
		</main>
	);
}
