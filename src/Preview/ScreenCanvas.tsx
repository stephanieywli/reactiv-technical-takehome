import { useRef } from "react";
import { useSections } from "../contexts/SectionsContext";
import { useSelection } from "../contexts/SectionSelectionContext";
import {
  useIsBelowBreakpoint,
  COMPACT_BREAKPOINT,
  WIDE_BREAKPOINT,
} from "../lib/hooks/useIsBelowBreakpoint";
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
  const isMobile = useIsBelowBreakpoint();
  const isCompact = useIsBelowBreakpoint(COMPACT_BREAKPOINT) && !isMobile;
  const isWideDesktop = !useIsBelowBreakpoint(WIDE_BREAKPOINT);
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

  const content =
    visibleSections.length === 0 ? (
      <div className="flex items-center justify-center h-full text-center px-6">
        <p className="text-xs text-brand-gray-400">
          No sections yet! To get started, try selecting a section from 'Quick
          Add'.
        </p>
      </div>
    ) : (
      visibleSections.map((section) => (
        <SectionPreview key={section.id} section={section} />
      ))
    );

  if (isMobile) {
    return (
      <div
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className="flex flex-col min-h-screen bg-brand-beige-50 pt-12 pb-14"
      >
        <div className="flex items-center gap-1.5 mx-auto my-4 px-3 py-2 rounded-full bg-white/95 border border-brand-gray-200 shadow-sm text-[11px] font-medium text-brand-gray-600 whitespace-nowrap shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
          Live Preview: add components via Layout Editor to begin
        </div>
        <div className="flex flex-col px-6 pb-12 space-y-4">{content}</div>
      </div>
    );
  }

  if (isCompact) {
    // adjust to 1 side panel for compact screens
    return (
      <div
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className="fixed left-112 right-0 top-12 bottom-0 bg-brand-beige-50 flex items-center justify-center overflow-hidden bg-dot-grid transition-all duration-200"
      >
        <PhoneFrame>{content}</PhoneFrame>
      </div>
    );
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`fixed left-0 right-0 top-12 bottom-0 bg-brand-beige-50 flex items-center justify-center overflow-hidden bg-dot-grid transition-all duration-200 ${
        selectedSection
          ? isWideDesktop
            ? "left-112 pr-116"
            : "left-80 pr-100"
          : "left-112 pr-0"
      }`}
    >
      <PhoneFrame>{content}</PhoneFrame>
    </div>
  );
};
