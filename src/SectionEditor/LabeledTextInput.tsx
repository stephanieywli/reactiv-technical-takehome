// a labeled text input field
import type { KeyboardEvent } from "react";

export const LabeledTextInput = ({
  label,
  value,
  onChange,
  placeholder,
  onBlur,
  onKeyDown,
  error,
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onBlur?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  error?: string | null;
  mono?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <b className="text-sm">{label}</b>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full bg-white px-3 py-2 rounded-lg border text-xs text-brand-gray-800 placeholder-brand-gray-400 ${
          mono ? "font-mono" : ""
        } ${error ? "border-red-400" : "border-brand-gray-200"}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
