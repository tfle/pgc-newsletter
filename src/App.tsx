import React from "react";
import mjml2html from "mjml-browser";
import { generateMJML } from "@/generateMJML";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Highlight } from "@/types";
import { Download } from "lucide-react";
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Email Preview</h2>
          <Button onClick={downloadHtml} variant="outline">
            <Download />
            Download HTML
          </Button>
        </div>
        <Preview previewHtml={previewHtml} />
      </div>
    </div>
  );
}

export default App;
