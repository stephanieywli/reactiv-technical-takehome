// Test that a change in the editor panel is reflected in the live preview
import { describe, expect, it } from "vitest";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { useState } from "react";
import { SaveFeedbackProvider } from "../contexts/SaveFeedbackContext";
import { TextPanel } from "../SectionEditor/panels/TextPanel";
import { TextPreview } from "../Preview/TextPreview";
import type { TextSection } from "../types";

// Initial section data
const initialSection: TextSection = {
  id: "1",
  type: "text",
  title: "Original Title",
  description: "Original description",
  titleColor: "#000000",
  descriptionColor: "#000000",
};

// Render the text block editor panel and preview
const EditorAndPreview = () => {
  const [section, setSection] = useState(initialSection);
  const onUpdate = (patch: Partial<TextSection>) =>
    setSection((prev) => ({ ...prev, ...patch }));

  return (
    <SaveFeedbackProvider>
      <TextPanel section={section} onUpdate={onUpdate} />
      <div data-testid="preview">
        <TextPreview section={section} isSelected onUpdate={onUpdate} />
      </div>
    </SaveFeedbackProvider>
  );
};

describe("editor matches preview", () => {
  // Test title block update
  it("updating the title in the panel is reflected in the preview", () => {
    render(<EditorAndPreview />);

    // update title in input
    const titleInput = screen.getByPlaceholderText("Enter a title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    // get title from preview
    const preview = within(screen.getByTestId("preview"));
    // except the preview string to match the input value
    expect(preview.getByRole("heading", { level: 3 }).textContent).toBe(
      "New Title",
    );
  });

  // Test description block update (same logic)
  it("typing a new description in the panel updates the live preview", () => {
    render(<EditorAndPreview />);

    const descriptionInput = screen.getByPlaceholderText("Enter a description");
    fireEvent.change(descriptionInput, {
      target: { value: "New description" },
    });
    const preview = within(screen.getByTestId("preview"));
    expect(preview.getByText("New description").textContent).toBe(
      "New description",
    );
  });
});
