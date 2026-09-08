import type { ReactNode } from "react";
import type { Icon as TablerIcon } from "@tabler/icons-react";

// Header for Side Nav bars
export const NavHeader = ({
  icon: Icon,
  title,
  isMobile,
  onMobileClick,
  chevron,
}: {
  icon: TablerIcon;
  title: string;
  isMobile: boolean;
  onMobileClick?: () => void;
  chevron: ReactNode;
}) => (
  <div
    className={`flex flex-row gap-1.5 items-center shrink-0 ${
      isMobile ? "p-4 cursor-pointer" : ""
    }`}
    onClick={isMobile ? onMobileClick : undefined}
  >
    <Icon
      size={25}
      className="bg-brand-green-200 text-brand-gray-700 p-0.5 rounded-md"
    />
    <h6 className="text-sm text-brand-gray-400 font-semibold flex-1">
      {title}
    </h6>
    {isMobile && chevron}
  </div>
);
