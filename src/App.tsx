import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";
import { generateMJML } from "@/generateMJML";
import { Highlight } from "@/types";
import mjml2html from "mjml-browser";
import React from "react";

function App() {
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [presidentMessage, setPresidentMessage] = React.useState("");
  const [highlights, setHighlights] = React.useState<Highlight[]>([
    {
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      dateTime: "",
      featured: true,
    },
  ]);
  const [previewHtml, setPreviewHtml] = React.useState("");
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);

  React.useEffect(() => {
    const formData = {
      title,
      subtitle,
      presidentMessage,
      highlights,
    };

    const mjmlString = generateMJML(formData);
    const { html } = mjml2html(mjmlString);
    setPreviewHtml(html);
  }, [title, subtitle, presidentMessage, highlights]);

  return (
    <div className="flex h-screen flex-col pt-16">
      <Header
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        presidentMessage={presidentMessage}
        setPresidentMessage={setPresidentMessage}
        highlights={highlights}
        setHighlights={setHighlights}
        previewHtml={previewHtml}
        isPreviewVisible={isPreviewVisible}
        setIsPreviewVisible={setIsPreviewVisible}
      />

      <main className="flex h-full w-full">
        <section
          className={`w-full space-y-4 overflow-y-auto border-r p-8 lg:w-1/2 ${isPreviewVisible ? "hidden" : ""}`}
        >
          <Editor
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            presidentMessage={presidentMessage}
            setPresidentMessage={setPresidentMessage}
            highlights={highlights}
            setHighlights={setHighlights}
          />
        </section>
        <section
          className={`w-full overflow-y-auto bg-gray-50 p-8 lg:block lg:w-1/2 ${!isPreviewVisible ? "hidden" : "lg:w-full"}`}
        >
          <Preview previewHtml={previewHtml} />
        </section>
      </main>
    </div>
  );
}

export default App;
