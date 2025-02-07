import React from "react";
import mjml2html from "mjml-browser";
import { generateMJML } from "@/generateMJML";
import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";
import { Highlight } from "@/types";

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
  const [isMobile, setIsMobile] = React.useState(false);

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

  // Resize listener to reset the "editor/preview" view
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Automatically revert to split view on larger screens
        setIsMobile(false);
      }
    };

    // Attach listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col space-y-16 h-screen">
      {/* Header */}
      <Header
        previewHtml={previewHtml}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />

      {/* Main Content */}
      {!isMobile ? (
        <div className="flex flex-row w-full h-full">
          {/* Left Section: Editor */}
          <div className="w-full lg:w-1/2 px-8 py-8 overflow-y-auto border-r">
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
          <div className="hidden lg:block w-1/2 p-6 overflow-y-auto bg-gray-50">
            <Preview previewHtml={previewHtml} />
          </div>
        </div>
      ) : (
        // Fullscreen Preview Section
        <div className="w-full h-screen p-6 overflow-y-auto bg-gray-50">
          <Preview previewHtml={previewHtml} />
        </div>
      )}
    </div>
  );
}

export default App;
