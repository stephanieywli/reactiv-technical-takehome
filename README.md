# Reactiv Technical Takehome

Author: Stephanie Li

This is a small web app that allows users build and preview a mobile app home screen in the comfort of a simple and intuitive dashboard. There are 3 component, or, section types that can be added/modified: image carousels, text blocks, and CTA buttons. Users can edit these components as well as the layout of their mobile home screen to their liking, and watch it come to life in a live phone preview. Users can also import/export their designs to JSON.

## To Run the Project

Requires Node 20+. Clone the repo then run the following:

```bash
yarn install
yarn dev
```

From there you may open the web app at `http://localhost:5173`.

Additional commands you can run:

```bash
yarn build # type-check + production build
yarn test  # run the automated test suite once
yarn lint  # eslint
```

## Approach

I started by reviewing the challenge's requirements, then used [Google Stitch](https://stitch.withgoogle.com/) to visualise a UI direction for the app. Once I had settled on a basic UI that I was happy with, I mapped out the design into components. I used Claude Code to help me do that, and to help lay out the steps/stages of development to expect for this project. From there I started building UI shells, then wired up functionality on top with React. Through the process and once things were functional, I tested the UX and responsiveness myself, and made adjustments to the UX/UI as needed. I asked Claude to do a code review (e.g. directory organisation, accessibility fixes, areas where I could make the code more modular/efficient). I tested by hand throughout, and added automated tests near the end of development, as I was testing.

Some Considerations & Assumptions:

- Considered how to make the UX/UI seamless across various screen sizes
- Kept accessibility in account during development
- Considered that users would enter URLs of all different formats, as well as of invalid formats
- Considered extra features such as hiding/deleting a section (in addition to adding and rearranging)

- Assumed that designs without populated fields (e.g. placeholder data/no data) could still be imported/exported, like you might download and import a draft to continue working
- Assumed that a valid image url means that the url is valid AND the image actually loads
- Assumed this is a client-only app and that persistence across page refreshes are not required
- Assumed that "meaningful tests" for the core editor/preview behaviour referred to making tests that prove that editing a field in the editor will update the preview content accordingly

## AI usage

I used Google Stitch for the initial design, and Claude Code throughout the development. For the UI, I accepted and modeled the desktop UI after what Stitch generated, but during development would test it myself and make changes based on what felt right on a real site (rather than a Figma screen). I also designed the mobile and "compact" UX/UI myself. As for technical help, I prompted Claude and "held its hand" throughout implementation; it would write code (e.g. UI components, functions) and then I would review the code myself so that I understand what was being done. From there, I would propose changes, review said changes, and repeat until satisfied. One example of something I rejected was using `useReducer` for the state management of Section actions (i.e. add, remove, edit, hide, etc.); instead I argued to use `useState` because the section actions were relatively simple functions. I felt that `useReducer` was overly complicated, as it involves defining action types, writing a reducer function and dispatching action objects. I'm also not as familiar with `useReducer`, hence the switch to `useState`.

## Testing

Run with `yarn test`:

- `isValidUrl.test.ts` — URL validation and normalization for URL fields
- `parseJson.test.ts` — JSON import validation
- `EditorPreview.test.tsx` — editor-to-preview behaviour (test that updating the editor also updates the live preview)
