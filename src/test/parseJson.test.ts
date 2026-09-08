// test that parseImportedSections transforms parsed JSON into Section[] or throws a specific error
import { describe, expect, it } from "vitest";
import { parseImportedSections } from "../lib/parseJson";

describe("parseImportedSections", () => {
  it("accepts a valid config and returns its sections", () => {
    const raw = {
      sections: [
        {
          id: "1",
          type: "text",
          title: "Hi",
          description: "There",
          titleColor: "#000",
          descriptionColor: "#111",
        },
      ],
    };
    expect(parseImportedSections(raw)).toEqual(raw.sections);
  });

  it("exports and imports sections", () => {
    const sections = [
      {
        id: "1",
        type: "carousel" as const,
        images: ["https://example.com/a.jpg"],
        aspect: "square" as const,
      },
    ];
    const exportedJson = JSON.stringify({ sections });
    const reparsed = JSON.parse(exportedJson);
    expect(parseImportedSections(reparsed)).toEqual(sections);
  });

  it("rejects an empty array", () => {
    expect(() => parseImportedSections([])).toThrow(/sections/i);
  });

  it("rejects null", () => {
    expect(() => parseImportedSections(null)).toThrow();
  });

  it("rejects a string", () => {
    expect(() => parseImportedSections("not json shaped")).toThrow();
  });

  it("rejects an object where sections is not an array", () => {
    expect(() => parseImportedSections({ sections: "error" })).toThrow(
      /must be an array/i,
    );
  });

  it("rejects a section missing the required fields", () => {
    expect(() =>
      parseImportedSections({ sections: [{ id: "1", type: "text" }] }),
    ).toThrow(/invalid or unrecognized/i);
  });

  it("rejects a section of unknown type", () => {
    expect(() =>
      parseImportedSections({
        sections: [{ id: "1", type: "video", url: "x" }],
      }),
    ).toThrow();
  });

  it("rejects a carousel with a non-string image url", () => {
    expect(() =>
      parseImportedSections({
        sections: [
          { id: "1", type: "carousel", images: [123], aspect: "landscape" },
        ],
      }),
    ).toThrow();
  });
});
