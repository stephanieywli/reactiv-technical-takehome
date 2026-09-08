import type { TextSection } from "../types";

export const TextPreview = ({
  section,
  isSelected,
}: {
  section: TextSection;
  isSelected: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <h3
        contentEditable={isSelected}
        suppressContentEditableWarning
        className={`text-lg font-bold leading-snug outline-none rounded ${
          isSelected ? "cursor-text focus:ring-2 focus:ring-brand-green-300" : ""
        }`}
        style={{ color: section.titleColor }}
      >
        {section.title}
      </h3>
      <p
        contentEditable={isSelected}
        suppressContentEditableWarning
        className={`text-xs leading-relaxed outline-none rounded ${
          isSelected ? "cursor-text focus:ring-2 focus:ring-brand-green-300" : ""
        }`}
        style={{ color: section.descriptionColor }}
      >
        {section.description}
      </p>
    </div>
  );
};
