import { useState } from "react";
import { IconLayoutGrid, IconChevronUp } from "@tabler/icons-react";
import { NavHeader } from "../NavHeader";
import { ScreenLayoutBody } from "./ScreenLayoutBody";
import { useSections } from "../Sections/SectionsContext";
import { useSelection } from "../Selection/SectionSelectionContext";
import { useIsMobile } from "../useIsMobile";

export const LayoutEditorNav = () => {
  const { sections, addSection, removeSection, moveSection, toggleVisibility } =
    useSections();
  const { selectedId, selectSection } = useSelection();
  const isMobile = useIsMobile();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // wider nav width if no sections are selected
  const isWide = !selectedId;

  // return nothing if a section is not selected on mobile
  if (isMobile && selectedId) return null;

  const header = (
    <NavHeader
      icon={IconLayoutGrid}
      title="Screen Layout"
      isMobile={isMobile}
      onMobileClick={() => setMobileExpanded((v) => !v)}
      chevron={
        <IconChevronUp
          size={18}
          className={`text-brand-gray-400 transition-transform ${
            mobileExpanded ? "" : "rotate-180"
          }`}
        />
      }
    />
  );

  const body = (
    <ScreenLayoutBody
      sections={sections}
      selectedId={selectedId}
      onAdd={(type) => selectSection(addSection(type))}
      onSelect={selectSection}
      onMove={moveSection}
      onToggleVisibility={toggleVisibility}
      onRemove={removeSection}
    />
  );

  // render body on mobile if expanded
  if (isMobile) {
    return (
      <nav
        className={`bg-white flex flex-col fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl border-t border-brand-gray-200 shadow-lg transition-all duration-200 overflow-hidden ${
          mobileExpanded ? "h-[70vh]" : "h-16"
        }`}
      >
        {header}
        {mobileExpanded && (
          <div className="flex-1 overflow-y-auto px-4 pb-4">{body}</div>
        )}
      </nav>
    );
  }

  return (
    <nav
      className={`bg-white flex flex-col fixed left-0 top-0 z-1 gap-4 h-screen border-r-2 border-brand-gray-50 pt-15 p-4 overflow-y-auto transition-all duration-200 ${
        isWide ? "w-md" : "w-xs"
      }`}
    >
      {header}
      {body}
    </nav>
  );
};
