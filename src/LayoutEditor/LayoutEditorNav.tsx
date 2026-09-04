import {
  IconCarouselHorizontal,
  IconTextOutline,
  IconRectangle,
  IconDragDrop,
} from "@tabler/icons-react";
import { IconButtonBlock } from "../IconButtonBlock";
import { SectionListItem } from "./SectionListItem";

export const LayoutEditorNav = () => {
  return (
    <nav className="bg-white flex flex-col fixed left-0 top-0 z-1 gap-2 h-screen border-r-2 border-brand-gray-50 w-xs pt-15 p-3">
      <h6 className="text-sm text-brand-gray-400 font-semibold">
        Quick Insert
      </h6>
      <div className="w-full grid grid-cols-3 gap-1.5">
        <IconButtonBlock
          IconComponent={IconCarouselHorizontal}
          label="Carousel"
        />
        <IconButtonBlock IconComponent={IconTextOutline} label="Text Block" />
        <IconButtonBlock IconComponent={IconRectangle} label="Button" />
      </div>
      <div className="w-full flex gap-2 flex-col">
        <SectionListItem />
        <SectionListItem />
        <SectionListItem />
        <div className="flex flex-row gap-1.5 items-center justify-center text-sm border border-dashed rounded-md p-1.5 px-2.5 text-brand-gray-400 border-brand-gray-300">
          <IconDragDrop size={20} stroke={1.5} /> Drag to reorder sections
        </div>
      </div>
    </nav>
  );
};
