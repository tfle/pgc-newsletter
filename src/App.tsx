import { Editor } from "@/components/Editor";
import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";
import { generateMJML } from "@/generateMJML";
import { Highlight } from "@/types";
import mjml2html from "mjml-browser";
import React from "react";

function App() {
  const [title, setTitle] = React.useState("");
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
      title,
      presidentMessage,
      highlights,
    };

    const mjmlString = generateMJML(formData);
    const { html } = mjml2html(mjmlString);
    setPreviewHtml(html);
  }, [title, presidentMessage, highlights]);

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
    <div className="flex h-screen flex-col space-y-16">
      {/* Header */}
      <Header
        previewHtml={previewHtml}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />

      {/* Main Content */}
      {!isMobile ? (
        <div className="flex h-full w-full flex-row">
          {/* Left Section: Editor */}
          <div className="w-full overflow-y-auto border-r px-8 py-8 lg:w-1/2">
            <Editor
              title={title}
              setTitle={setTitle}
              presidentMessage={presidentMessage}
              setPresidentMessage={setPresidentMessage}
              highlights={highlights}
              setHighlights={setHighlights}
            />
          </div>

          {/* Right Section: Preview */}
          <div className="hidden w-1/2 overflow-y-auto bg-gray-50 p-6 lg:block">
            <Preview previewHtml={previewHtml} />
          </div>
        </div>
      ) : (
        // Fullscreen Preview Section
        <div className="h-screen w-full overflow-y-auto bg-gray-50 p-6">
          <Preview previewHtml={previewHtml} />
        </div>
      )}
    </div>
  );
}

export default App;
