import type { TextSection } from "../../types";
import { ColourInput } from "../ColourInput";
import { LabeledTextInput } from "../LabeledTextInput";
import { useSaveFeedback } from "../../Toast/SaveFeedbackContext";

export const TextPanel = ({
  section,
  onUpdate,
}: {
  section: TextSection;
  onUpdate: (patch: Partial<TextSection>) => void;
}) => {
  const { triggerSaving } = useSaveFeedback();

  return (
    <div className="flex flex-col gap-3">
      <LabeledTextInput
        label="Title"
        value={section.title}
        onChange={(title) => onUpdate({ title })}
        onBlur={triggerSaving}
        placeholder="Enter a title"
      />
      <div className="flex flex-col gap-1.5">
        <b className="text-sm">Description</b>
        <textarea
          rows={3}
          value={section.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          onBlur={triggerSaving}
          placeholder="Enter a description"
          className="w-full bg-white p-3 rounded-lg border border-brand-gray-200 text-xs text-brand-gray-800 placeholder-brand-gray-400 resize-none"
        />
      </div>

      <hr className="border-brand-gray-100" />

      <ColourInput
        label="Title Colour"
        value={section.titleColor}
        onChange={(titleColor) => onUpdate({ titleColor })}
      />
      <ColourInput
        label="Description Colour"
        value={section.descriptionColor}
        onChange={(descriptionColor) => onUpdate({ descriptionColor })}
      />
    </div>
  );
};
