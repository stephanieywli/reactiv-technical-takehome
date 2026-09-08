import {
  IconCarouselHorizontal,
  IconTextOutline,
  IconRectangle,
  IconDragDrop,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { IconButtonBlock } from "../IconButtonBlock";

export const LayoutEditorNav = () => {
  return (
    <nav className="bg-white flex flex-col fixed left-0 top-0 z-1 gap-4 h-screen border-r-2 border-brand-gray-50 w-xs pt-15 p-4 overflow-y-auto">
      <div className="flex flex-row gap-1.5 items-center">
        <IconLayoutGrid
          size={25}
          className="bg-brand-green-200 text-brand-gray-700 p-0.5 rounded-md"
        />
        <h6 className="text-sm text-brand-gray-400 font-semibold">
          Screen Layout
        </h6>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
          Quick Insert
        </span>
        <div className="w-full grid grid-cols-3 gap-1.5">
          <IconButtonBlock
            IconComponent={IconCarouselHorizontal}
            label="Carousel"
          />
          <IconButtonBlock IconComponent={IconTextOutline} label="Text Block" />
          <IconButtonBlock IconComponent={IconRectangle} label="Button" />
        </div>
      </div>

      <hr className="border-brand-gray-100" />

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
          Sections
        </span>
        <div className="w-full flex gap-2 flex-col">
          Added sections here
          <div className="flex flex-row gap-1.5 items-center justify-center text-sm border border-dashed rounded-md p-1.5 px-2.5 text-brand-gray-400 border-brand-gray-300">
            <IconDragDrop size={20} stroke={1.5} /> Drag to reorder sections
          </div>
        </div>
      </div>
    </nav>
  );
};
