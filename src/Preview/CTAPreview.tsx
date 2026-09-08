import type { CTASection } from "../types";
import { useSaveFeedback } from "../Toast/SaveFeedbackContext";

export const CTAPreview = ({
  section,
  isSelected,
  onUpdate,
}: {
  section: CTASection;
  isSelected: boolean;
  onUpdate: (patch: Partial<CTASection>) => void;
}) => {
  const { triggerSaving } = useSaveFeedback();

  return (
    <button
      type="button"
      className="w-full py-1.5 px-5 rounded-full font-bold text-sm cursor-pointer"
      style={{
        backgroundColor: section.buttonColor,
        color: section.labelColor,
      }}
    >
      <span
        contentEditable={isSelected}
        suppressContentEditableWarning
        data-placeholder="Enter button label"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          onUpdate({ label: e.currentTarget.textContent ?? "" });
          triggerSaving();
        }}
        className={`outline-none rounded ${
          isSelected ? "cursor-text focus:ring-2 focus:ring-white/60" : ""
        }`}
      >
        {section.label || null}
      </span>
    </button>
  );
};
