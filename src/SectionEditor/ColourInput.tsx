import { useSaveFeedback } from "../Toast/SaveFeedbackContext";

// Colour hex selector field
export const ColourInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const { triggerSaving } = useSaveFeedback();

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-brand-gray-700">{label}</span>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={triggerSaving}
          className="w-4 h-4 rounded-full border-0 p-0 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-brand-gray-200"
        />
        <span className="font-mono text-xs text-brand-gray-700 uppercase">
          {value}
        </span>
      </label>
    </div>
  );
};
