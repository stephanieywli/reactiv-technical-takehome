import type { Icon } from "@tabler/icons-react";

export const IconButtonBlock = ({
  IconComponent,
  label,
}: {
  IconComponent: Icon;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-1 items-center border bg-white border-brand-gray-200 hover:border-brand-green-400 transition-colors rounded-lg px-2 py-1 cursor-pointer">
      <IconComponent size={30} stroke={1.5} className="text-brand-gray-400" />
      <p className="text-xs text-center">{label}</p>
    </div>
  );
};
