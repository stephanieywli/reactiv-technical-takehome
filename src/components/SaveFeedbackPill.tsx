import { useSaveFeedback } from "../contexts/SaveFeedbackContext";

export const SaveFeedbackPill = () => {
  const { status } = useSaveFeedback();
  if (!status) return null; // show nothing if idle

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gray-50 border border-brand-gray-200 text-xs font-medium text-brand-gray-700 whitespace-nowrap">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "saving" ? "bg-brand-gray-300" : "bg-brand-green-500"
        }`}
      />
      {status === "saving" ? "Saving..." : "Saved"}
    </div>
  );
};
