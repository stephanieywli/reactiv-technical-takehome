import { CarouselPanel } from "./panels/CarouselPanel";
import { TextPanel } from "./panels/TextPanel";
import { CTAPanel } from "./panels/CTAPanel";
import type { Section } from "../types";

const panelLabel: Record<Section["type"], string> = {
  carousel: "Carousel",
  text: "Text",
  cta: "CTA",
};

export const SectionEditorBody = ({
  section,
  onUpdate,
}: {
  section: Section;
  onUpdate: (patch: Partial<Section>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
        {panelLabel[section.type]}
      </span>
      {section.type === "carousel" && (
        <CarouselPanel section={section} onUpdate={onUpdate} />
      )}
      {section.type === "text" && (
        <TextPanel section={section} onUpdate={onUpdate} />
      )}
      {section.type === "cta" && (
        <CTAPanel section={section} onUpdate={onUpdate} />
      )}
    </div>
  );
};
