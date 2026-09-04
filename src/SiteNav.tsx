import { Logo } from "./assets/Logo";

export const SiteNav = () => {
  return (
    <nav className="grid grid-cols-3 grid-rows-1 gap-2 items-center fixed top-0 w-full border-b-2 border-brand-gray-50 p-2 bg-white z-100">
      <div className="flex flex-row gap-2 items-center">
        <div className="p-1.5 bg-brand-green-300 w-fit aspect-square">
          <Logo size={18} />
        </div>{" "}
        <h6>Reactiv Studio</h6>
      </div>
      <div className="text-sm flex flex-row justify-self-center gap-2">
        <h6>Untitled Project</h6> / <p>Page Name</p>
      </div>
      <div className="justify-self-end">
        <button
          className="rounded-full border px-2 py-1 text-sm font-medium cursor-pointer"
          onClick={() => null}
        >
          Export JSON
        </button>
      </div>
    </nav>
  );
};
