import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SiteNav } from "./SiteNav.tsx";
import { LayoutEditorNav } from "./LayoutEditor/LayoutEditorNav.tsx";
import { SectionEditorNav } from "./SectionEditor/ElementEditorNav.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteNav />
    <LayoutEditorNav />
    <SectionEditorNav />
  </StrictMode>,
);
