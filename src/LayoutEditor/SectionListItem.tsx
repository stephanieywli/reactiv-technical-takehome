import { IconGripVertical, IconEye } from "@tabler/icons-react";

export const SectionListItem = ({
  index,
  title,
  subtitle,
  isSelected,
  onClick,
}: {
  index: number;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row items-center justify-between p-1.5 pr-3 border rounded-lg bg-white transition-colors cursor-pointer ${
        isSelected
          ? "border-brand-green-500 ring-1 ring-brand-green-200"
          : "border-brand-gray-200 hover:border-brand-green-400"
      }`}
    >
      <div className="flex flex-row gap-2 items-center min-w-0">
        <IconGripVertical
          size={20}
          className="text-brand-gray-300 shrink-0 cursor-grab"
        />
        <div className="bg-brand-green-300 mr-1 rounded-full text-center font-bold w-6 shrink-0">
          {index}
        </div>
        <div className="min-w-0">
          <b className="text-sm block truncate">{title}</b>
          <p className="text-sm text-brand-gray-500 truncate">{subtitle}</p>
        </div>
      </div>
      <IconEye size={20} className="text-brand-gray-600 shrink-0" />
    </div>
  );
};
