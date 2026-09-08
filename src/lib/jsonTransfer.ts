import type { Section } from "../types";
import { parseImportedSections } from "./parseJson";

type ToastActions = {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
};

// EXPORT: validates current sections, then exports them as a JSON file
// return error/toast msg if there are invalid/missing fields
export const exportJson = (sections: Section[], toast: ToastActions) => {
  // build a downloadable file object; clientside
  const blob = new Blob([JSON.stringify({ sections }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); // create download link in-memory
  a.href = url;
  a.download = "screen-config.json";
  a.click(); // trigger download
  URL.revokeObjectURL(url); // clean up url

  toast.showSuccess("Exported layout to screen-config.json");
};

// IMPORT: reads, parses, and validates a json file; sets current sections to match JSON if valid
// returns error/toast if invalid
export const importJson = (
  file: File,
  actions: { importSections: (sections: Section[]) => void } & ToastActions,
): Promise<void> => {
  return new Promise((resolve) => {
    // validate file type
    if (!file.name.toLowerCase().endsWith(".json")) {
      actions.showError("Import failed: please select a .json file.");
      resolve();
      return;
    }

    // reader object can read a file's contents
    const reader = new FileReader();

    reader.onload = () => {
      try {
        // parse & validate json (correct sections/shapes)
        const raw = JSON.parse(reader.result as string);
        const imported = parseImportedSections(raw);
        // set sections, show success toast
        actions.importSections(imported);
        actions.showSuccess(
          `Imported ${imported.length} section${imported.length === 1 ? "" : "s"}`,
        );
      } catch (err) {
        // show error on fail
        const message = err instanceof Error ? err.message : "Unknown error.";
        actions.showError(`Import failed: ${message}`);
      }
      resolve();
    };

    reader.onerror = () => {
      // show error on failed read
      actions.showError("Import failed: could not read the file.");
      resolve();
    };

    // read file
    reader.readAsText(file);
  });
};
