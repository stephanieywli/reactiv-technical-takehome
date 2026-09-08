import type { CTASection } from "../types";

export const CTAPreview = ({ section }: { section: CTASection }) => {
  return (
    <button
      type="button"
      className="w-full py-1.5 px-5 rounded-full font-bold text-sm cursor-pointer"
      style={{
        backgroundColor: section.buttonColor,
        color: section.labelColor,
      }}
    >
      {section.label}
    </button>
  );
};
