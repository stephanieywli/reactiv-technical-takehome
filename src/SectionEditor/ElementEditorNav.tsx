import {
  IconAdjustmentsHorizontal,
  IconRectangle,
  IconRectangleVertical,
  IconSquare,
} from "@tabler/icons-react";
import { IconButtonBlock } from "../IconButtonBlock";

export const SectionEditorNav = () => {
  return (
    <nav className="bg-white flex flex-col fixed right-0 top-0 gap-2 h-screen border-l-2 border-brand-gray-50 w-xs pt-15 p-3">
      <div className="flex flex-row gap-1.5 items-center">
        <IconAdjustmentsHorizontal
          size={25}
          className="bg-brand-green-200 text-brand-gray-700 p-0.5 rounded-md"
        />
        <h6 className="text-sm text-brand-gray-400 font-semibold">
          Section Editor
        </h6>
      </div>{" "}
      <b className="text-sm">Aspect Ratio</b>
      <div className="max-w-full grid grid-cols-3 gap-2">
        <IconButtonBlock IconComponent={IconRectangle} label="Landscape" />
        <IconButtonBlock
          IconComponent={IconRectangleVertical}
          label="Portrait"
        />
        <IconButtonBlock IconComponent={IconSquare} label="Square" />
      </div>
    </nav>
  );
};
