import type { Section } from "../types";

// Validate URL
export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const sectionLabel: Record<Section["type"], string> = {
  carousel: "Carousel",
  text: "Text block",
  cta: "CTA button",
};

// Validates sections for JSON export
export const validateSections = (sections: Section[]): string[] => {
  const errors: string[] = [];

  sections.forEach((section, i) => {
    const name = `${sectionLabel[section.type]} (#${i + 1})`;

    switch (section.type) {
      case "carousel": {
        if (section.images.length === 0) {
          errors.push(`${name} has no images.`);
          break;
        }
        section.images.forEach((url, j) => {
          if (!url.trim()) {
            errors.push(`${name}, image ${j + 1} is empty.`);
          } else if (!isValidUrl(url)) {
            errors.push(`${name}, image ${j + 1} is not a valid URL.`);
          }
        });
        break;
      }
      case "text": {
        if (!section.title.trim()) errors.push(`${name} is missing a title.`);
        if (!section.description.trim())
          errors.push(`${name} is missing a description.`);
        break;
      }
      case "cta": {
        if (!section.label.trim()) errors.push(`${name} is missing a label.`);
        if (!section.link.trim()) {
          errors.push(`${name} is missing a link.`);
        } else if (!isValidUrl(section.link)) {
          errors.push(`${name}'s link is not a valid URL.`);
        }
        break;
      }
    }
  });

  return errors;
};
