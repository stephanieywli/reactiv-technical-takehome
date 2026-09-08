import { useState } from "react";
import {
  IconRectangle,
  IconRectangleVertical,
  IconSquare,
  IconPhoto,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { IconButtonBlock } from "../../IconButtonBlock";
import { isValidUrl } from "../../Sections/validateSections";
import { checkImageLoads } from "../checkImageLoads";
import { useSaveFeedback } from "../../Toast/SaveFeedbackContext";
import type { CarouselAspect, CarouselSection } from "../../types";

export const CarouselPanel = ({
  section,
  onUpdate,
}: {
  section: CarouselSection;
  onUpdate: (patch: Partial<CarouselSection>) => void;
}) => {
  const [newUrl, setNewUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const { triggerSaving } = useSaveFeedback();

  // Add new img to carousel
  const addImage = async () => {
    // validate url by syntax and img load
    const url = newUrl.trim();
    if (!url || validating) return;

    if (!isValidUrl(url)) {
      setUrlError(
        "Invalid link — please enter a valid URL (e.g. https://example.com/photo.jpg)",
      );
      return;
    }

    setValidating(true);
    const loads = await checkImageLoads(url);
    setValidating(false);

    if (!loads) {
      setUrlError(
        "The link you entered failed to load an image. Please check that the link is correct.",
      );
      return;
    }

    onUpdate({ images: [...section.images, url] });
    setNewUrl("");
    setUrlError(null);
    triggerSaving();
  };

  // Remove img from carousel
  const removeImage = (index: number) => {
    onUpdate({ images: section.images.filter((_, i) => i !== index) });
    triggerSaving();
  };

  // Set aspect ratio of carousel
  const setAspect = (aspect: CarouselAspect) => {
    onUpdate({ aspect });
    triggerSaving();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <b className="text-sm">Aspect Ratio</b>
        <div className="max-w-full grid grid-cols-3 gap-2">
          <IconButtonBlock
            IconComponent={IconRectangle}
            label="Landscape"
            isActive={section.aspect === "landscape"}
            onClick={() => setAspect("landscape")}
          />
          <IconButtonBlock
            IconComponent={IconRectangleVertical}
            label="Portrait"
            isActive={section.aspect === "portrait"}
            onClick={() => setAspect("portrait")}
          />
          <IconButtonBlock
            IconComponent={IconSquare}
            label="Square"
            isActive={section.aspect === "square"}
            onClick={() => setAspect("square")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <b className="text-sm">Images ({section.images.length})</b>

        <div className="flex flex-col gap-1.5">
          {section.images.map((url, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2 rounded-lg border border-brand-gray-200 bg-white"
            >
              <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 bg-brand-gray-100 border border-brand-gray-200 flex items-center justify-center">
                {url ? (
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IconPhoto size={16} className="text-brand-gray-300" />
                )}
              </div>
              <span className="flex-1 min-w-0 text-xs font-mono text-brand-gray-600 truncate">
                {url}
              </span>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="text-brand-gray-400 hover:text-red-600 shrink-0"
              >
                <IconTrash size={16} />
              </button>
            </div>
          ))}
          {section.images.length === 0 && (
            <p className="text-xs text-brand-gray-400 py-2 text-start">
              No images yet! Add one via link below.
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={newUrl}
            disabled={validating}
            onChange={(e) => {
              setNewUrl(e.target.value);
              if (urlError) setUrlError(null); // clear error msg when user changes input
            }}
            onKeyDown={(e) => e.key === "Enter" && addImage()}
            placeholder="https://"
            className={`flex-1 bg-white px-3 py-1.5 rounded-lg border text-xs font-mono text-brand-gray-800 placeholder-brand-gray-400 disabled:opacity-60 ${
              urlError ? "border-red-400" : "border-brand-gray-200"
            }`}
          />
          <button
            type="button"
            onClick={addImage}
            disabled={validating}
            className="px-2.5 py-1.5 rounded-lg bg-brand-gray-100 hover:bg-brand-green-100 disabled:opacity-60 disabled:hover:bg-brand-gray-100 text-brand-gray-700 hover:text-brand-green-700 border border-brand-gray-200 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <IconPlus size={14} />
            {validating ? "validating..." : "Add"}
          </button>
        </div>
        {urlError && <p className="text-xs text-red-600">{urlError}</p>}
      </div>
    </div>
  );
};
