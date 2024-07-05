import { ModeToggle } from "@/components/mode-toggle";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import HelpPopup from "@/components/HelpPopup";
import { useEffect, useState } from "react";

function setViewportHeight() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
	const [showHelpPopup, setShowHelpPopup] = useState(false);
	const toggleHelpPopup = () => {
		setShowHelpPopup(!showHelpPopup);
	};

	useEffect(() => {
		// Memanggil fungsi untuk pertama kali
		setViewportHeight();

		// Mengatur ulang tinggi viewport saat ukuran jendela berubah
		window.addEventListener("resize", setViewportHeight);

		// Membersihkan event listener saat komponen di-unmount
		return () => {
			window.removeEventListener("resize", setViewportHeight);
		};
	}, []);

	return (
		<main className="w-full h-dvh flex flex-col bg-zinc-50 dark:bg-zinc-900 duration-200 overflow-hidden">
			<Header toggleHelpPopup={toggleHelpPopup} />
			<ModeToggle />
			{children}
			{/*<Footer />*/}
			{showHelpPopup && <HelpPopup toggleHelpPopup={toggleHelpPopup} />}
		</main>
	);
}
