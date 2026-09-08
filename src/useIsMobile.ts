// Hook that returns if the viewport width is less than a breakpoint (tailwind md by default)
import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
  // set initial state
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    // recheck and reset when the window is resized
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
