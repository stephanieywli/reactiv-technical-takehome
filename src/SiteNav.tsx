import { useRef, useState, type ChangeEvent } from "react";
import {
  IconChevronDown,
  IconFileImport,
  IconFileExport,
} from "@tabler/icons-react";
import { Logo } from "./components/Logo";
import { useSections } from "./contexts/SectionsContext";
import { useToast } from "./contexts/ToastContext";
import { exportJson, importJson } from "./lib/jsonTransfer";
import { SaveFeedbackPill } from "./components/SaveFeedbackPill";

export const SiteNav = () => {
  const { sections, importSections } = useSections();
  const { showError, showSuccess } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null); //
  const [menuOpen, setMenuOpen] = useState(false);

  // Event handlers: JSON export, import, file change
  const handleExport = () => {
    setMenuOpen(false);
    exportJson(sections, { showError, showSuccess });
  };

  const handleImportClick = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };

  // Read parse and validate json when user choses a file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    importJson(file, { importSections, showError, showSuccess });
  };

  return (
    <nav className="flex flex-row justify-between ap-2 items-center fixed top-0 w-full border-b-2 border-brand-gray-50 p-2 bg-white z-100">
      <SaveFeedbackPill />
      <div className="flex flex-row gap-2 items-center">
        <div className="p-1.5 bg-brand-green-300 w-fit aspect-square">
          <Logo size={18} />
        </div>{" "}
        <h6 className="hidden md:block">Reactiv Studio</h6>
      </div>
      <div className="justify-self-end relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          className="rounded-full border px-3 py-1 text-sm font-medium cursor-pointer flex items-center gap-1"
          onClick={() => setMenuOpen((v) => !v)}
        >
          JSON
          <IconChevronDown
            size={14}
            className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {menuOpen && (
          <>
            {/* Close menu on outside click */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            {/** Menu */}
            <div className="absolute right-0 top-full mt-2 z-20 w-40 bg-white border border-brand-gray-200 rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={handleImportClick}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-brand-gray-700 hover:bg-brand-gray-50 cursor-pointer"
              >
                <IconFileImport size={16} />
                Import JSON
              </button>
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-brand-gray-700 hover:bg-brand-gray-50 cursor-pointer"
              >
                <IconFileExport size={16} />
                Export JSON
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
