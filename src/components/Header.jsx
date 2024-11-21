import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { Fingerprint } from "lucide-react"

function Header() {
  return (
    <div className="absolute top-0 left-0 flex w-full items-center justify-between bg-zinc-900 px-4 py-3 md:py-4 duration-200 z-20">
      <h1 className="text-lg font-semibold text-white flex items-center gap-2">
        <Fingerprint className="w-8 h-8 text-emerald-500 stroke-[1.5px] duration-200 hover:text-emerald-400" />
        <span className="text-2xl font-montserrat text-zinc-500">
          SimplyAI
          <sup className="text-yellow-500 font-semibold text-sm">new</sup>
        </span>
      </h1>
      <div className="flex items-center space-x-4">
        {/* <button
          onClick={toggleHelpPopup}
          className="text-zinc-400 focus:outline-none z-20"
        > */}
        <InformationCircleIcon className="h-6 w-6" />
        {/* </button> */}
      </div>
    </div >
  )
}

export default Header
