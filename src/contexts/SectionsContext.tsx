// Tracks the list of added sections and all layout actions (add, remove, reorder, edit, hide, and import)
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Section } from "../types";

type SectionsContextValue = {
  sections: Section[];
  addSection: (type: Section["type"]) => string;
  removeSection: (id: string) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  editSection: <S extends Section>(id: string, patch: Partial<S>) => void;
  toggleVisibility: (id: string) => void;
  importSections: (sections: Section[]) => void;
};

// create a new sections with default values
const createSection = (type: Section["type"]): Section => {
  const id = crypto.randomUUID();
  switch (type) {
    case "carousel":
      return { id, type: "carousel", images: [], aspect: "landscape" };
    case "text":
      return {
        id,
        type: "text",
        title: "New Text Block",
        description: "Add a description here.",
        titleColor: "#000000",
        descriptionColor: "#000000",
      };
    case "cta":
      return {
        id,
        type: "cta",
        label: "Button Label",
        link: "",
        buttonColor: "#72a22a",
        labelColor: "#ffffff",
      };
  }
};

// create new context for sections array & associated actions
const SectionsContext = createContext<SectionsContextValue | null>(null);

// wrap the app in this once (see main.tsx) so any component underneath
// can call useSections() to read the list and dispatch changes to it
export const SectionsProvider = ({ children }: { children: ReactNode }) => {
  // initial state of app (no sections)
  const [sections, setSections] = useState<Section[]>([]);

  // create and add new section to sections array; return new section id for auto-select purposes
  const addSection = useCallback((type: Section["type"]) => {
    const section = createSection(type);
    setSections((prev) => [...prev, section]);
    return section.id;
  }, []);

  // remove section
  const removeSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // move section up/down array index 1 step
  const moveSection = useCallback((id: string, direction: "up" | "down") => {
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      const target = direction === "up" ? index - 1 : index + 1;

      // if section not found, or already at the top/bottom edge, do nothing
      if (index === -1 || target < 0 || target >= prev.length) return prev;

      // else, swap values at index & target index; return updated array
      const next = [...prev];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return next;
    });
  }, []);

  // edit section field
  const editSection = useCallback((id: string, update: Partial<Section>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? ({ ...s, ...update } as Section) : s)),
    );
  }, []);

  // toggle section visibility
  const toggleVisibility = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s)),
    );
  }, []);

  // set sections to imported sections
  const importSections = useCallback((sections: Section[]) => {
    setSections(sections);
  }, []);

  return (
    <SectionsContext.Provider
      value={{
        sections,
        addSection,
        removeSection,
        moveSection,
        editSection,
        toggleVisibility,
        importSections,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const ctx = useContext(SectionsContext);
  if (!ctx) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return ctx;
};
