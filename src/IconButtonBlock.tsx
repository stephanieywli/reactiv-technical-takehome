import type { Icon } from "@tabler/icons-react";

export const IconButtonBlock = ({
  IconComponent,
  label,
  onClick,
  isActive,
}: {
  IconComponent: Icon;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`flex flex-col gap-1 items-center border transition-all rounded-lg px-3 py-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-green-300 ${
        isActive
          ? "border-brand-green-600 bg-brand-green-600 shadow-sm"
          : "border-brand-gray-200 bg-white hover:border-brand-green-400 hover:bg-brand-green-50"
      }`}
    >
      <IconComponent
        size={30}
        stroke={1.5}
        className={isActive ? "text-white" : "text-brand-gray-400"}
      />
      <p className={`text-xs font-medium ${isActive ? "text-white" : "text-brand-gray-700"}`}>
        {label}
      </p>
    </button>
  );
};
