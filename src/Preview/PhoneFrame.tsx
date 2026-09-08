import { IconWifi, IconBattery2 } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useIsMobile } from "../lib/hooks/useIsMobile";

export const PhoneFrame = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();

  // display the content full-bleed (no phone UI) on mobile
  if (isMobile) {
    return (
      <div className="w-full h-full bg-white flex flex-col relative">
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-10 space-y-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    // Outer frame
    <div className="aspect-9/19.5 h-[85vh] max-h-211 bg-black rounded-[52px] p-2.5 shadow-2xl shrink-0">
      {/** Inner Screen */}
      <div className="w-full h-full bg-white rounded-[44px] overflow-hidden flex flex-col relative">
        {/** Upper Status bar */}
        <div className="pt-3 px-6 pb-2 flex items-center justify-between shrink-0 z-10 relative">
          <span className="text-xs font-bold text-black">09:00</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black rounded-full" />
          <div className="flex items-center gap-1 text-black">
            <IconWifi size={14} stroke={2} />
            <IconBattery2 size={18} stroke={1.5} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-10 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
