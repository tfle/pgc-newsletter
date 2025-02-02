import React from "react";
import "./App.css";
import { Highlight } from "./types";
import mjml2html from "mjml-browser";
import { generateMJML } from "./generate-mjml";
import { Editor } from "@/components/Editor.tsx";

function App() {
  const [month, setMonth] = React.useState("");
  const [presidentMessage, setPresidentMessage] = React.useState("");
  const [highlights, setHighlights] = React.useState<Highlight[]>([
    {
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      featured: false,
    },
  ]);
  const [previewHtml, setPreviewHtml] = React.useState("");

  React.useEffect(() => {
    const formData = {
      month,
      presidentMessage,
      highlights,
    };

    const mjmlString = generateMJML(formData);
    const { html } = mjml2html(mjmlString);
    setPreviewHtml(html);
  }, [month, presidentMessage, highlights]);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Left Section: Editor */}
      <div className="w-1/2 p-6 overflow-y-auto bg-white shadow-md border-r">
        <Editor
          month={month}
          setMonth={setMonth}
          presidentMessage={presidentMessage}
          setPresidentMessage={setPresidentMessage}
          highlights={highlights}
          setHighlights={setHighlights}
        />
      </div>

      {/* Right Section: Preview */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Email Preview</h2>
        <div className="border bg-white p-4 rounded-lg shadow-md">
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      </div>
    </div>
  );
}

export default App;
