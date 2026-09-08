// Tracks toast message and success/error states
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

type ToastStatus = "error" | "success";
type ToastState = { message: string; status: ToastStatus } | null;

type ToastContextValue = {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
};

// create context for toast messages
const ToastContext = createContext<ToastContextValue | null>(null);

const dotClass: Record<ToastStatus, string> = {
  success: "bg-brand-green-500",
  error: "bg-red-600",
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState>(null);
  const timeoutRef = useRef<number | null>(null);

  // cancel pending timer
  const clearPending = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  // show error toast (4s)
  const showError = useCallback((message: string) => {
    clearPending();
    setToast({ message, status: "error" });
    timeoutRef.current = window.setTimeout(() => setToast(null), 4000);
  }, []);

  // show success toast (2.5s)
  const showSuccess = useCallback((message: string) => {
    clearPending();
    setToast({ message, status: "success" });
    timeoutRef.current = window.setTimeout(() => setToast(null), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showError, showSuccess }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-gray-200 shadow-lg text-xs font-medium text-brand-gray-700 max-w-xs text-right">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass[toast.status]}`}
          />
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
