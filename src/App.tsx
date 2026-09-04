export const App = () => {
  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <div className="w-xl flex flex-col gap-6">
          <h4>Objective</h4>
          <p>
            {" "}
            Build a React web application that lets users preview and modify an
            example mobile app home screen in real time. The preview updates
            live as they edit.
          </p>
          <p className="text-start gap-2 flex flex-col">
            <b className="">Carousel:</b>
            <ul className="list-disc ml-10">
              <li>
                horizontal scroll; plugin can be used for carousel features
              </li>
              <li>add, edit, rm img urls from carousel</li>
              <li>display img in portrait, landscape, or square mode</li>
            </ul>
            <b className="">Textarea:</b>
            <ul className="list-disc ml-10">
              <li>title & description</li>
              <li>Text and colours can be customized by user</li>
            </ul>
            <b className="">CTA:</b>
            <ul className="list-disc ml-10">
              <li>Display a button with a label.</li>
              <li>
                Label, link, and colours of the button + label can be customized
                by user
              </li>
            </ul>
          </p>
        </div>
      </section>
    </>
  );
};
