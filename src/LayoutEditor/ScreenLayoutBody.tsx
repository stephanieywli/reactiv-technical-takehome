import {
  IconCarouselHorizontal,
  IconTextOutline,
  IconRectangle,
  IconArrowsSort,
} from "@tabler/icons-react";
import { IconButtonBlock } from "../components/IconButtonBlock";
import { SectionListItem } from "./SectionListItem";
import type { Section } from "../types";

const sectionLabel: Record<Section["type"], string> = {
  carousel: "Image Carousel",
  text: "Text Block",
  cta: "Button",
};

const sectionSubtitle = (section: Section): string => {
  switch (section.type) {
    case "carousel":
      return `${section.aspect[0].toUpperCase()}${section.aspect.slice(1)} · ${section.images.length} images`;
    case "text": {
      const title = section.title.trim() || "Enter a title";
      const description = section.description.trim() || "Enter a description";
      return `${title} · ${description}`;
    }
    case "cta":
      return section.label.trim() || "Enter a label";
  }
};

export const ScreenLayoutBody = ({
  sections,
  selectedId,
  onAdd,
  onSelect,
  onMove,
  onToggleVisibility,
  onRemove,
}: {
  sections: Section[];
  selectedId: string | null;
  onAdd: (type: Section["type"]) => void;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onToggleVisibility: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/** Quick Add grid */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
          Quick Add
        </span>
        <div className="w-full grid grid-cols-3 gap-1.5">
          <IconButtonBlock
            IconComponent={IconCarouselHorizontal}
            label="Carousel"
            onClick={() => onAdd("carousel")}
          />
          <IconButtonBlock
            IconComponent={IconTextOutline}
            label="Text Block"
            onClick={() => onAdd("text")}
          />
          <IconButtonBlock
            IconComponent={IconRectangle}
            label="Button"
            onClick={() => onAdd("cta")}
          />
        </div>
      </div>

      <hr className="border-brand-gray-100" />

      {/** Sections list */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
          Sections
        </span>
        <div className="w-full flex gap-2 flex-col">
          {sections.length === 0 ? (
            <p className="text-xs text-brand-gray-400 text-center border border-dashed rounded-md py-3 px-2">
              Click a section above to add a new section to the layout.
            </p>
          ) : (
            <ol className="list-none flex gap-2 flex-col">
              {sections.map((section, i) => (
                <SectionListItem
                  key={section.id}
                  index={i + 1}
                  title={sectionLabel[section.type]}
                  subtitle={sectionSubtitle(section)}
                  isSelected={selectedId === section.id}
                  isHidden={!!section.hidden}
                  onClick={() => onSelect(section.id)}
                  onMoveUp={i > 0 ? () => onMove(section.id, "up") : undefined}
                  onMoveDown={
                    i < sections.length - 1
                      ? () => onMove(section.id, "down")
                      : undefined
                  }
                  onToggleVisibility={() => onToggleVisibility(section.id)}
                  onDelete={() => onRemove(section.id)}
                />
              ))}
            </ol>
          )}
          {sections.length > 1 && (
            <div className="flex flex-row gap-1.5 items-center justify-center text-sm border border-dashed rounded-md p-1.5 px-2.5 text-brand-gray-400 border-brand-gray-300">
              <IconArrowsSort size={20} stroke={1.5} /> Use arrows to reorder
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
