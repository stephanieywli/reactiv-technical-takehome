import type { Icon } from "@tabler/icons-react";

export const IconButtonBlock = ({
  IconComponent,
  label,
}: {
  IconComponent: Icon;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-1 items-center border bg-white border-brand-gray-200 rounded-lg px-4 py-1">
      <IconComponent size={30} stroke={1.5} />
      <p className="text-xs">{label}</p>
    </div>
  );
};
