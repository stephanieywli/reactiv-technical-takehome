import type { Section } from "../types";

const VALID_SECTION_TYPES = ["carousel", "text", "cta"];
const VALID_ASPECTS = ["landscape", "portrait", "square"];

// typeguard for an individual section
const isSection = (value: unknown): value is Section => {
  // section must be a valid object
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (typeof v.id !== "string" || !v.id) return false;
  if (typeof v.type !== "string" || !VALID_SECTION_TYPES.includes(v.type))
    return false;

  // field types must be valid; return T/F
  switch (v.type) {
    case "carousel":
      return (
        Array.isArray(v.images) &&
        v.images.every((img) => typeof img === "string") &&
        typeof v.aspect === "string" &&
        VALID_ASPECTS.includes(v.aspect)
      );
    case "text":
      return (
        typeof v.title === "string" &&
        typeof v.description === "string" &&
        typeof v.titleColor === "string" &&
        typeof v.descriptionColor === "string"
      );
    case "cta":
      return (
        typeof v.label === "string" &&
        typeof v.link === "string" &&
        typeof v.buttonColor === "string" &&
        typeof v.labelColor === "string"
      );
    default:
      return false;
  }
};

// parse JSON file for sections
export const parseImportedSections = (raw: unknown): Section[] => {
  // validate sections; throw error if type is invalid
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error('File must contain an object with a "sections" array.');
  }

  const sections = (raw as Record<string, unknown>).sections;
  if (!Array.isArray(sections)) {
    throw new Error('"sections" must be an array.');
  }

  // check that every section is valid
  if (!sections.every(isSection)) {
    throw new Error(
      "One or more sections have an invalid or unrecognized shape.",
    );
  }

  return sections; // return array of validated sections
};
