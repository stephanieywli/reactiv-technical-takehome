import {
  IconChevronUp,
  IconChevronDown,
  IconTrash,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

export const SectionListItem = ({
  index,
  title,
  subtitle,
  isSelected,
  isHidden,
  onClick,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onDelete,
}: {
  index: number;
  title: string;
  subtitle: string;
  isSelected: boolean;
  isHidden: boolean;
  onClick: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
}) => {
  return (
    <li
      onClick={onClick}
      className={`flex flex-row items-center justify-between p-1.5 pr-2 border rounded-lg bg-white transition-all cursor-pointer ${
        isSelected
          ? "border-brand-green-500 ring-1 ring-brand-green-200"
          : "border-brand-gray-200 hover:border-brand-green-400"
      } ${isHidden ? "opacity-50" : "opacity-100"}`}
    >
      <div className="flex flex-row gap-2 items-center min-w-0">
        <div className="flex flex-col text-brand-gray-300 shrink-0">
          <button
            type="button"
            disabled={!onMoveUp}
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp?.();
            }}
            className="disabled:opacity-20 hover:text-brand-gray-600"
          >
            <IconChevronUp size={14} />
          </button>
          <button
            type="button"
            disabled={!onMoveDown}
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown?.();
            }}
            className="disabled:opacity-20 hover:text-brand-gray-600"
          >
            <IconChevronDown size={14} />
          </button>
        </div>
        <div className="bg-brand-green-300 mr-1 rounded-full text-center font-bold w-6 shrink-0">
          {index}
        </div>
        <div className="min-w-0">
          <b className="text-sm block truncate">{title}</b>
          <p className="text-sm text-brand-gray-500 truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className="text-brand-gray-400 hover:text-brand-gray-700"
        >
          {isHidden ? <IconEyeOff size={18} /> : <IconEye size={18} />}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-brand-gray-400 hover:text-red-600"
        >
            <IconTrash size={18} />
        </button>
      </div>
    </li>
  );
};
