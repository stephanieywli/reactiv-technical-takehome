# Reactiv Studio — Mobile App Home Screen Editor

A small web app for building a mobile app's home screen out of three section types — image carousels, text blocks, and CTA buttons — with a live phone preview, JSON import/export, and a responsive editor that adapts between desktop (side panels) and mobile (bottom sheets).

## Getting started

Requires Node 20+.

```bash
yarn install
yarn dev
```

Opens at `http://localhost:5173`.

Other commands:

```bash
yarn build       # type-check + production build
yarn test        # run the automated test suite once
yarn test:watch  # run tests in watch mode
yarn lint        # eslint
```

## Approach

**State management.** Four React Contexts, each owning one concern:
`SectionsContext` (the actual screen data — the list of sections and every action that changes it), `SectionSelectionContext` (what's currently selected/hovered, plus mobile bottom-sheet expand/collapse state), `ToastContext` (one-off success/error messages), `SaveFeedbackContext` (the recurring "Saving…/Saved" indicator). Each started as `useReducer`, but was simplified to plain `useState` + setter functions once it was clear the reducer indirection wasn't earning its keep at this scale — a deliberate readability call, not a missing feature.

**Directory structure.** `contexts/` (state), `lib/` (pure logic — URL validation, JSON parsing, image-load checking — plus `lib/hooks/` for the two custom hooks), feature folders (`LayoutEditor/`, `SectionEditor/`, `Preview/`) for UI grouped by what it's part of, and `test/` mirroring the same layout for the logic layer.

**Validation is real, not just syntactic.** A carousel image URL isn't just checked for valid syntax — `checkImageLoads` actually attempts to load it before accepting it, since a syntactically-valid-but-dead link (`https://images.unsplash.c`, a truncated real example) passes `new URL()` fine but was never going to render. Link fields also get normalized (`www.google.com` → `https://www.google.com`) and checked against the real RFC 1123 hostname rule, not just whatever `new URL()` happens to allow through (which is looser than a real domain name — it'll accept characters no actual hostname would ever contain).

**Import is defensive by construction, not by patching.** `parseImportedSections` is a type guard that checks every required field on every section variant before trusting any of it — a missing field, wrong type, or unrecognized section type throws a specific error rather than corrupting app state. Malformed JSON, a non-`.json` file, and a file that fails to read are three separate, distinct failure paths, each with its own message — nothing sends the app to a broken state.

**Export never blocks.** Early on, export refused to run if any field was missing/invalid. That was inverted deliberately: exporting is meant to double as "save my in-progress draft," so an incomplete screen exports fine and can be re-imported later to keep working on it.

**Mobile isn't a squeezed-down desktop.** `useIsMobile` (a `matchMedia` hook) drives real structural differences, not just CSS breakpoints — the phone preview goes chromeless and full-bleed instead of showing a fake phone bezel (the user's already looking at it on an actual phone), the two side panels become collapsible bottom sheets that share a single-active-panel model, and selection can only happen through the section list (not by tapping the live preview) so the preview stays a true "read-only until you commit to editing" surface.

**Accessibility.** Every interactive element is a real `<button>` (or, where an `<li>` can't be a `<button>` because it contains other real buttons, `role="button"` + `tabIndex` + Enter/Space handling) — the app is fully keyboard-operable, not just click-operable.

## Testing

43 tests across 5 files, focused entirely on logic and state rather than rendering/UI interaction:

- `isValidUrl.test.ts` — URL validation and normalization
- `parseJson.test.ts` — import validation, including every malformed-input case
- `jsonTransfer.test.ts` — the actual export/import orchestration
- `SectionsContext.test.tsx` — every section CRUD action
- `SectionSelectionContext.test.tsx` — selection/hover state, including the "deleting the selected section clears the selection" edge case

This was a deliberate scope line: the tests cover everything with real branching logic or failure modes (validation, state transitions, malformed input), and stop short of component-rendering/UI-interaction tests (e.g. rendering a panel and simulating typing into it) — that layer was verified by hand throughout development instead. Test dependencies were kept to exactly what's used: no `@testing-library/jest-dom` or `@testing-library/user-event` remain installed, since nothing in the current suite exercises DOM-rendering or simulated-interaction assertions.
