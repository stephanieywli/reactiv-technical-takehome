import { IconGripVertical } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";

export const SectionListItem = () => {
  return (
    <div className="flex flex-row items-center justify-between p-1.5 pr-3 border border-brand-gray-200 rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <IconGripVertical size={20} className="text-brand-gray-300" />
        <div className="bg-brand-green-300 mr-1 rounded-full text-center font-bold w-6">
          1
        </div>
        <div>
          <b className="text-sm">Section Title</b>
          <p className="text-sm text-brand-gray-500">Section Subtitle</p>
        </div>
      </div>{" "}
      <IconEye size={20} className="text-brand-gray-600" />
    </div>
  );
};
