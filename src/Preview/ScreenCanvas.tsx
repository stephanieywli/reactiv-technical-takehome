import { useRef } from "react";
import { useSections } from "../contexts/SectionsContext";
import { useSelection } from "../contexts/SectionSelectionContext";
import { useIsMobile } from "../lib/hooks/useIsMobile";
import { PhoneFrame } from "./PhoneFrame";
import { SectionPreview } from "./SectionPreview";

export const ScreenCanvas = () => {
  const { sections } = useSections();
  const {
    selectedSection,
    clearSelection,
    setMobileExpanded,
    setSectionEditorExpanded,
  } = useSelection();
  const isMobile = useIsMobile();
  const visibleSections = sections.filter((section) => !section.hidden);

  const wasEditingRef = useRef(false);

  const handleMouseDown = () => {
    const active = document.activeElement;
    wasEditingRef.current =
      !!active && active.getAttribute("contenteditable") === "true";
  };

  const handleClick = () => {
    if (isMobile) {
      // contract/expand nav panel panel on mobile
      if (selectedSection) {
        setSectionEditorExpanded(false);
      } else {
        setMobileExpanded(false);
      }
      return;
    }
    if (wasEditingRef.current) {
      // if user was editing a preview text field, simply deselect the field
      wasEditingRef.current = false;
      return;
    }
    clearSelection();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`fixed left-0 right-0 top-0 h-screen bg-brand-beige-50 pt-15 pb-14 md:pb-0 flex flex-col items-center justify-center gap-3 overflow-hidden md:bg-dot-grid transition-all duration-200 ${
        selectedSection ? "md:left-80 md:pr-100" : "md:left-112 md:pr-0"
      }`}
    >
      {isMobile && (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-brand-gray-200 shadow-sm text-[11px] font-medium text-brand-gray-600 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
          Live Preview: add components via Layout Editor to begin
        </div>
      )}
      <div className="relative w-full h-full md:w-auto md:h-auto">
        <PhoneFrame>
          {visibleSections.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center px-6">
              <p className="text-xs text-brand-gray-400">
                No sections yet! To get started, try selecting a section from
                'Quick Add'.
              </p>
            </div>
          ) : (
            visibleSections.map((section) => (
              <SectionPreview key={section.id} section={section} />
            ))
          )}
        </PhoneFrame>
      </div>
    </div>
  );
};
