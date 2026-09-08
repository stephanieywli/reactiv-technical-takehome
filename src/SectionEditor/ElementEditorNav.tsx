import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { CarouselPanel } from "./panels/CarouselPanel";
import { TextPanel } from "./panels/TextPanel";
import { CTAPanel } from "./panels/CTAPanel";
import { useSelection } from "../Selection/SectionSelectionContext";
import { useSections } from "../Sections/SectionsContext";
import { useIsMobile } from "../useIsMobile";
import type { Section } from "../types";

const panelLabel: Record<Section["type"], string> = {
  carousel: "Carousel",
  text: "Text",
  cta: "CTA",
};

export const SectionEditorNav = () => {
  const { selectedSection, clearSelection } = useSelection();
  const { editSection } = useSections();
  const isMobile = useIsMobile();

  if (!selectedSection) return null;

  // Header: Nav title
  const header = (
    <div
      className={`flex flex-row gap-1.5 items-center shrink-0 ${
        isMobile ? "p-4 cursor-pointer" : ""
      }`}
      onClick={isMobile ? clearSelection : undefined}
    >
      <IconAdjustmentsHorizontal
        size={25}
        className="bg-brand-green-200 text-brand-gray-700 p-0.5 rounded-md"
      />
      <h6 className="text-sm text-brand-gray-400 font-semibold flex-1">
        Section Editor
      </h6>
      {isMobile && (
        <IconChevronDown size={18} className="text-brand-gray-400" />
      )}
    </div>
  );

  // Body: Panel label and component
  const body = (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
        {panelLabel[selectedSection.type]}
      </span>
      {selectedSection.type === "carousel" && (
        <CarouselPanel
          section={selectedSection}
          onUpdate={(patch) => editSection(selectedSection.id, patch)}
        />
      )}
      {selectedSection.type === "text" && (
        <TextPanel
          section={selectedSection}
          onUpdate={(patch) => editSection(selectedSection.id, patch)}
        />
      )}
      {selectedSection.type === "cta" && (
        <CTAPanel
          section={selectedSection}
          onUpdate={(patch) => editSection(selectedSection.id, patch)}
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <nav className="bg-white flex flex-col fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl border-t border-brand-gray-200 shadow-lg h-[70vh] overflow-hidden">
        {header}
        <div className="flex-1 overflow-y-auto px-4 pb-4">{body}</div>
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
