// Section preview wrapper
import type { Section } from "../types";
import { CarouselPreview } from "./CarouselPreview";
import { TextPreview } from "./TextPreview";
import { CTAPreview } from "./CTAPreview";
import { useSelection } from "../contexts/SectionSelectionContext";
import { useSections } from "../contexts/SectionsContext";
import { useIsBelowBreakpoint } from "../lib/hooks/useIsBelowBreakpoint";

export const SectionPreview = ({ section }: { section: Section }) => {
  const { selectedId, hoveredId, selectSection, setHoveredId } = useSelection();
  const { editSection } = useSections();
  const isMobile = useIsBelowBreakpoint();
  const isSelected = selectedId === section.id;

  // Set focus to hovered > selected section; dim sections not currently in focus
  const focusedId = hoveredId ?? selectedId;
  const isDimmed = focusedId !== null && focusedId !== section.id;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // stops deselection from ScreenCanvas
        if (isMobile) return; // do nothing on mobile
        if (!isSelected) selectSection(section.id); // select section on click in preview; deselect from nav/canvas
      }}
      onMouseEnter={() => setHoveredId(section.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={`md:cursor-pointer transition-opacity duration-200 ${
        isDimmed && !isMobile ? "opacity-50" : "opacity-100"
      }`}
    >
      {section.type === "carousel" && (
        <CarouselPreview section={section} isSelected={isSelected} />
      )}
      {section.type === "text" && (
        <TextPreview
          section={section}
          isSelected={isSelected}
          onUpdate={(patch) => editSection(section.id, patch)}
        />
      )}
      {section.type === "cta" && (
        <CTAPreview
          section={section}
          isSelected={isSelected}
          onUpdate={(patch) => editSection(section.id, patch)}
        />
      )}
    </div>
  );
};
