import { X } from "lucide-react"

// eslint-disable-next-line react/prop-types
function HelpPopup({ toggleHelpPopup }) {

  const onMouseUp = (e) => {
    if (e.target.classList.contains("fixed")) {
      toggleHelpPopup()
    }
  }
  return (
    <div className="fixed top-10 right-10 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-50" onMouseUp={onMouseUp}></div>
      <div className="relative md:max-w-3xl mx-2 w-full min-h-40 bg-zinc-900 z-10 rounded-md duration-200 shadow-md">
        <button
          className="absolute top-0 right-0 p-4"
          onClick={toggleHelpPopup}
        >
          <X className="w-6 h-6 text-zinc-500" />
        </button>
        <div className="p-8">
          <h2 className="md:text-3xl text-2xl pb-4 font-semibold text-blue-500 font-bebasneue tracking-wider text-center">
            Infomation!
          </h2>
          <ul className="w-full list-inside text-zinc-500 mt-2 font-montserrat text-sm md:text-base">
            <li className="mb-2">
              This is a new version of SimplyAI
            </li>
          </ul>
          <div className="w-full">
            <p className="text-center text-zinc-400 mt-4 text-xs font-montserrat">
              © 2024 SimplyAI 2.0. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPopup
