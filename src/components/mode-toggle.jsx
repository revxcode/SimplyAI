import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useMediaQuery } from "react-responsive";

export function ModeToggle() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { theme, setTheme } = useTheme();
  let clickStartTime = 0;
  let clickTimeoutRef = null;
  const CLICK_THRESHOLD = isMobile ? 22 : 222; // Threshold for distinguishing between a click and a long press

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleOnMouseDown = (event) => {
    if (event.button !== 0) return; // Only react to left mouse button
    clickStartTime = Date.now();
    clickTimeoutRef = setTimeout(() => {}, CLICK_THRESHOLD); // Set timeout to differentiate between long press and short click
  };

  const handleOnMouseUp = (event) => {
    if (event.button !== 0) return; // Only react to left mouse button
    clearTimeout(clickTimeoutRef);

    const clickDuration = Date.now() - clickStartTime;
    if (clickDuration < CLICK_THRESHOLD) {
      toggleTheme();
    }
  };

  const handleOnTouchStart = () => {
    clickStartTime = Date.now();
    clickTimeoutRef = setTimeout(() => {}, CLICK_THRESHOLD); // Set timeout to differentiate between long press and short tap
  };

  const handleOnTouchEnd = () => {
    clearTimeout(clickTimeoutRef);

    const clickDuration = Date.now() - clickStartTime;
    if (clickDuration < CLICK_THRESHOLD) {
      toggleTheme();
    }
  };

  //default position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [{ x, y }, api] = useSpring(() => ({ x: position.x, y: position.y }));

  const bind = useDrag(
    ({ down, movement: [mx, my], memo = [position.x, position.y] }) => {
      if (Date.now() - clickStartTime > CLICK_THRESHOLD) {
        // Only allow drag if the click duration is more than CLICK_THRESHOLD
        if (down) {
          api.start({ x: memo[0] + mx, y: memo[1] + my });
        } else {
          setPosition({ x: memo[0] + mx, y: memo[1] + my });
        }
        return memo;
      }
    },
    { from: () => [x.get(), y.get()], filterTaps: true },
  );

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: "none" }}
      className={"fixed z-50 top-20 left-4"}
    >
      <div className="flex space-x-4">
        <button
          type="button"
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-md focus:outline-none ring-2 ring-blue-500 dark:ring-yellow-500 duration-200"
        >
          {theme === "dark" ? (
            <SunIcon className="md:h-6 md:w-6 h-5 w-5 text-yellow-400" />
          ) : (
            <MoonIcon className="md:h-6 md:w-6 h-5 w-5 text-blue-600" />
          )}
        </button>
      </div>
    </animated.div>
  );
}
