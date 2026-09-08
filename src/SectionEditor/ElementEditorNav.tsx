import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

export const SectionEditorNav = () => {
  return (
    <nav className="bg-white flex flex-col fixed right-4 top-15 bottom-4 rounded-2xl border border-brand-gray-200 shadow-lg w-sm overflow-hidden">
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto my-5 px-3">
        <div className="flex flex-row gap-1.5 items-center">
          <IconAdjustmentsHorizontal
            size={25}
            className="bg-brand-green-200 text-brand-gray-700 p-0.5 rounded-md"
          />
          <h6 className="text-sm text-brand-gray-400 font-semibold">
            Section Editor
          </h6>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-300">
            Section Title
          </span>
          Render panel here
        </div>
      </div>
    </nav>
  );
};
