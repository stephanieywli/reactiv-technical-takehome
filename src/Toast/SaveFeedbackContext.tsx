import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

type SaveFeedbackStatus = "saving" | "saved" | null;

type SaveFeedbackContextValue = {
  status: SaveFeedbackStatus;
  triggerSaving: () => void;
};

// Create context for the current "saved"/"saving" status
const SaveFeedbackContext = createContext<SaveFeedbackContextValue | null>(
  null,
);

export const SaveFeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<SaveFeedbackStatus>(null);
  const timeoutRef = useRef<number | null>(null);

  const triggerSaving = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current); // clear pending timer
    setStatus("saving");
    timeoutRef.current = window.setTimeout(() => {
      setStatus("saved"); // set status to saved after (0.5s)
      timeoutRef.current = window.setTimeout(() => setStatus(null), 1500);
    }, 500);
  }, []);

  return (
    <SaveFeedbackContext.Provider value={{ status, triggerSaving }}>
      {children}
    </SaveFeedbackContext.Provider>
  );
};

export const useSaveFeedback = () => {
  const ctx = useContext(SaveFeedbackContext);
  if (!ctx) {
    throw new Error(
      "useSaveFeedback must be used within a SaveFeedbackProvider",
    );
  }
  return ctx;
};
