import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SiteNav } from "./SiteNav.tsx";
import { LayoutEditorNav } from "./LayoutEditor/LayoutEditorNav.tsx";
import { SectionEditorNav } from "./SectionEditor/ElementEditorNav.tsx";
import { ScreenCanvas } from "./Preview/ScreenCanvas.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";
import { SaveFeedbackProvider } from "./contexts/SaveFeedbackContext.tsx";
import { SelectionProvider } from "./contexts/SectionSelectionContext.tsx";
import { SectionsProvider } from "./contexts/SectionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <SectionsProvider>
        <SelectionProvider>
          <SaveFeedbackProvider>
            <SiteNav />
            <LayoutEditorNav />
            <ScreenCanvas />
            <SectionEditorNav />
          </SaveFeedbackProvider>
        </SelectionProvider>
      </SectionsProvider>
    </ToastProvider>
  </StrictMode>,
);
