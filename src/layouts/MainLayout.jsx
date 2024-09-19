// import { ToggleMode } from "@/components/ToggleMode"
import Header from "@/components/Header"
import HelpPopup from "@/components/HelpPopup"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
	const [showHelpPopup, setShowHelpPopup] = useState(false)
	const toggleHelpPopup = () => {
		setShowHelpPopup(!showHelpPopup)
	}
	return (
		<main className="w-full h-dvh flex flex-col bg-zinc-50 dark:bg-zinc-900 duration-200">
			<Header toggleHelpPopup={toggleHelpPopup} />
			{/*<ToggleMode />*/}
			{children}
			{showHelpPopup && <HelpPopup toggleHelpPopup={toggleHelpPopup} />}
		</main>
	)
}
