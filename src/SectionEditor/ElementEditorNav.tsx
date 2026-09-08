import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconChevronLeft,
} from "@tabler/icons-react";
import { NavHeader } from "../NavHeader";
import { SectionEditorBody } from "./SectionEditorBody";
import { useSelection } from "../Selection/SectionSelectionContext";
import { useSections } from "../Sections/SectionsContext";
import { useIsMobile } from "../lib/useIsMobile";

export const SectionEditorNav = () => {
  const {
    selectedSection,
    clearSelection,
    sectionEditorExpanded,
    setSectionEditorExpanded,
  } = useSelection();
  const { editSection } = useSections();
  const isMobile = useIsMobile();

  if (!selectedSection) return null;

  const header = (
    <NavHeader
      icon={IconAdjustmentsHorizontal}
      title="Section Editor"
      isMobile={isMobile}
      onMobileClick={() => setSectionEditorExpanded(!sectionEditorExpanded)}
      chevron={
        <IconChevronDown
          size={18}
          className={`text-brand-gray-400 transition-transform ${
            sectionEditorExpanded ? "rotate-180" : ""
          }`}
        />
      }
    />
  );

  const body = (
    <SectionEditorBody
      section={selectedSection}
      onUpdate={(patch) => editSection(selectedSection.id, patch)}
    />
  );

  if (isMobile) {
    return (
      <nav
        className={`bg-white flex flex-col fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl border-t border-brand-gray-200 shadow-lg transition-all duration-200 overflow-hidden ${
          sectionEditorExpanded ? "h-[70vh]" : "h-16"
        }`}
      >
        {sectionEditorExpanded && (
          <button
            type="button"
            onClick={clearSelection}
            className="flex items-center gap-0.5 px-4 pt-3 text-xs font-medium text-brand-green-600"
          >
            <IconChevronLeft size={14} />
            Back to Layout
          </button>
        )}
        {header}
        {sectionEditorExpanded && (
          <div className="flex-1 overflow-y-auto px-4 pb-4">{body}</div>
        )}
      </nav>
    );
  }

  return (
    <nav className="bg-white flex flex-col fixed right-4 top-15 bottom-4 rounded-2xl border border-brand-gray-200 shadow-lg w-sm overflow-hidden">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto my-5 px-3">
        {header}
        {body}
      </div>
    </nav>
  );
};
