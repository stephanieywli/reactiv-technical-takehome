import { useState } from "react";
import { isValidUrl, normalizeUrl } from "../../lib/isValidUrl";
import { useSaveFeedback } from "../../contexts/SaveFeedbackContext";
import { ColourInput } from "../ColourInput";
import { LabeledTextInput } from "../LabeledTextInput";
import type { CTASection } from "../../types";

export const CTAPanel = ({
  section,
  onUpdate,
}: {
  section: CTASection;
  onUpdate: (patch: Partial<CTASection>) => void;
}) => {
  const [urlError, setUrlError] = useState<string | null>(null);
  const { triggerSaving } = useSaveFeedback();

  const validateLink = (value: string) => {
    const trimmed = value.trim();
    const invalid = trimmed && !isValidUrl(trimmed);
    setUrlError(
      invalid
        ? "Invalid link — please enter a valid URL (e.g. https://example.com/photo.jpg)"
        : null,
    );
    if (!invalid && trimmed) onUpdate({ link: normalizeUrl(trimmed) });
    if (!invalid) triggerSaving();
  };

  return (
    <div className="flex flex-col gap-3">
      <LabeledTextInput
        label="Button Label"
        value={section.label}
        onChange={(label) => onUpdate({ label })}
        onBlur={triggerSaving}
        placeholder="Enter button label"
      />
      <LabeledTextInput
        label="Link"
        value={section.link}
        onChange={(link) => {
          onUpdate({ link });
          if (urlError) setUrlError(null); // clear error msg when user changes input
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        onBlur={validateLink}
        placeholder="https://"
        error={urlError}
        mono
      />

      <hr className="border-brand-gray-100" />

      <ColourInput
        label="Button Colour"
        value={section.buttonColor}
        onChange={(buttonColor) => onUpdate({ buttonColor })}
      />
      <ColourInput
        label="Label Colour"
        value={section.labelColor}
        onChange={(labelColor) => onUpdate({ labelColor })}
      />
    </div>
  );
};
