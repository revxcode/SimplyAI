import Header from "@/components/Header"
import HelpPopup from "@/components/HelpPopup"
import { useState } from "react"

export default function MainLayout({ children }) {
	const [showHelpPopup, setShowHelpPopup] = useState(false)
	const toggleHelpPopup = () => {
		setShowHelpPopup(!showHelpPopup)
	}
	return (
		<main className="w-full h-dvh duration-200">
			<Header toggleHelpPopup={toggleHelpPopup} />
			{children}
			{showHelpPopup && <HelpPopup toggleHelpPopup={toggleHelpPopup} />}
		</main>
	)
}
