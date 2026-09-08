// Hook that returns if the viewport width is less than a breakpoint (tailwind md by default)
import { useEffect, useState } from "react";

export const useIsBelowBreakpoint = (breakpoint = 768) => {
  // set initial state
  const [isBelow, setIsBelow] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    // recheck and reset when the window is resized
    const handleResize = () => setIsBelow(window.innerWidth < breakpoint);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isBelow;
};

export const COMPACT_BREAKPOINT = 1024;
export const WIDE_BREAKPOINT = 1536;
