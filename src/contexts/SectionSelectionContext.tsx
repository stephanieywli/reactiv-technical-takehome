// Tracks which section is currently selected/hovered for UI state
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useSections } from "./SectionsContext";
import type { Section } from "../types";

type SelectionContextValue = {
  selectedId: string | null;
  selectedSection: Section | null;
  selectSection: (id: string) => void;
  clearSelection: () => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  mobileExpanded: boolean;
  setMobileExpanded: (expanded: boolean) => void;
  sectionEditorExpanded: boolean;
  setSectionEditorExpanded: (expanded: boolean) => void;
};

// Create context for section selection/hover
const SelectionContext = createContext<SelectionContextValue | null>(null);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const { sections } = useSections();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [sectionEditorExpanded, setSectionEditorExpanded] = useState(true);

  // return section object if it exists in the sections array; else null
  // only run if sections array or selected section change
  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedId) ?? null,
    [sections, selectedId],
  );

  // If the selected section DNE in sections array, clear selection
  useEffect(() => {
    if (selectedId && !sections.find((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [sections, selectedId]);

  // select a section; if the section is already selected, deselect it
  // expand the section editor nav for mobile
  const selectSection = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
    setSectionEditorExpanded(true);
  };

  // clear selection (i.e. on deselect)
  const clearSelection = () => setSelectedId(null);

  return (
    <SelectionContext.Provider
      value={{
        selectedId,
        selectedSection,
        selectSection,
        clearSelection,
        hoveredId,
        setHoveredId,
        mobileExpanded,
        setMobileExpanded,
        sectionEditorExpanded,
        setSectionEditorExpanded,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return ctx;
};
