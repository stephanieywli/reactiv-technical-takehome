import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SiteNav } from "./SiteNav.tsx";
import { LayoutEditorNav } from "./LayoutEditor/LayoutEditorNav.tsx";
import { SectionEditorNav } from "./SectionEditor/ElementEditorNav.tsx";
import { ScreenCanvas } from "./Preview/ScreenCanvas.tsx";
import { ToastProvider } from "./Toast/ToastContext.tsx";
import { SaveFeedbackProvider } from "./Toast/SaveFeedbackContext.tsx";
import { SelectionProvider } from "./Selection/SectionSelectionContext.tsx";
import { SectionsProvider } from "./Sections/SectionsContext.tsx";

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
