// Text block preview
import type { TextSection } from "../types";
import { useSaveFeedback } from "../Toast/SaveFeedbackContext";

export const TextPreview = ({
  section,
  isSelected,
  onUpdate,
}: {
  section: TextSection;
  isSelected: boolean;
  onUpdate: (patch: Partial<TextSection>) => void;
}) => {
  const { triggerSaving } = useSaveFeedback();

  return (
    <div className="flex flex-col gap-1.5">
      <h3
        contentEditable={isSelected}
        suppressContentEditableWarning
        data-placeholder="Enter a title"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          onUpdate({ title: e.currentTarget.textContent ?? "" });
          triggerSaving();
        }}
        className={`text-lg font-bold leading-snug outline-none rounded ${
          isSelected
            ? "cursor-text focus:ring-2 focus:ring-brand-green-300"
            : ""
        }`}
        style={{ color: section.titleColor }}
      >
        {section.title || null}
      </h3>
      <p
        contentEditable={isSelected}
        suppressContentEditableWarning
        data-placeholder="Enter a description"
        onBlur={(e) => {
          onUpdate({ description: e.currentTarget.innerText ?? "" });
          triggerSaving();
        }}
        className={`text-xs leading-relaxed outline-none rounded whitespace-pre-line ${
          isSelected
            ? "cursor-text focus:ring-2 focus:ring-brand-green-300"
            : ""
        }`}
        style={{ color: section.descriptionColor }}
      >
        {section.description || null}
      </p>
    </div>
  );
};
