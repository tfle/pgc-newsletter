import React from "react";
import mjml2html from "mjml-browser";
import { generateMJML } from "@/generateMJML";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Highlight } from "@/types";
import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

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
  const [showPreview, setShowPreview] = React.useState(false);

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

  const downloadHtml = () => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "newsletter.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {!showPreview ? (
        // Editor Section
        <div className="flex flex-col md:flex-row w-full h-screen bg-white">
          {/* Left Section: Editor */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">PGC Newsletter Editor</h1>
              <Button
                onClick={() => setShowPreview(true)}
                className="md:hidden"
              >
                <Eye />
                Show Preview
              </Button>
            </div>
            <Editor
              month={month}
              setMonth={setMonth}
              presidentMessage={presidentMessage}
              setPresidentMessage={setPresidentMessage}
              highlights={highlights}
              setHighlights={setHighlights}
            />
          </div>

          {/* Right Section: Preview (hidden on mobile) */}
          <div className="hidden md:block w-1/2 p-6 overflow-y-auto bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Email Preview</h2>
            </div>
            <Preview previewHtml={previewHtml} />
          </div>
        </div>
      ) : (
        // Fullscreen Preview Section
        <div className="w-full h-screen p-6 overflow-y-auto bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Email Preview</h2>
            <Button onClick={() => setShowPreview(false)} className="md:hidden">
              <Pencil />
              Back to Editor
            </Button>
          </div>
          <Preview previewHtml={previewHtml} />
        </div>
      )}
    </>
  );
}

export default App;
