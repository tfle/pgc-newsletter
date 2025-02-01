import React from "react";
import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { Plus, Trash2 } from "lucide-react";
import { Highlight } from "./types";
import mjml2html from "mjml-browser";
import { generateMJML } from "./generate-mjml";

function App() {
  const [month, setMonth] = React.useState("");
  const [presidentMessage, setPresidentMessage] = React.useState("");
  const [highlights, setHighlights] = React.useState<Highlight[]>([
    {
      title: "",
      description: "",
      imageUrl: "",
      link: "",
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

  const updateHighlight = (
    index: number,
    field: keyof Highlight,
    value: string,
  ) => {
    const newHighlights = [...highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setHighlights(newHighlights);
  };

  const addHighlight = () => {
    const newHighlights = [...highlights];
    newHighlights.push({
      title: "",
      description: "",
      imageUrl: "",
      link: "",
    });
    setHighlights(newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...highlights];
    newHighlights.splice(index, 1);
    setHighlights(newHighlights);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-4 overflow-y-auto border-r">
        {/* Basic Info */}
        <div className="space-y-4">
          <Label htmlFor="newsletterMonth">Newsletter Month</Label>
          <Input
            type="text"
            placeholder="e.g. January"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <Label htmlFor="message">President's Message</Label>
          <Textarea
            id="message"
            value={presidentMessage}
            onChange={(e) => setPresidentMessage(e.target.value)}
          />
        </div>

        {/* Highlights */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Highlights</h2>
          <Button onClick={addHighlight} variant="outline">
            <Plus />
            Add Highlight
          </Button>

          {/* Highlight Cards */}
          {highlights.map((highlight, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Highlight {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => removeHighlight(index)}
                    variant="ghost"
                  >
                    <Trash2 />
                  </Button>
                </div>
                <Input
                  type="text"
                  placeholder="Title"
                  value={highlight.title}
                  onChange={(e) =>
                    updateHighlight(index, "title", e.target.value)
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={highlight.description}
                  onChange={(e) =>
                    updateHighlight(index, "description", e.target.value)
                  }
                />
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={highlight.imageUrl}
                  onChange={(e) =>
                    updateHighlight(index, "imageUrl", e.target.value)
                  }
                />
                <Input
                  type="url"
                  placeholder="Link URL"
                  value={highlight.link}
                  onChange={(e) =>
                    updateHighlight(index, "link", e.target.value)
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview - Right Half */}
      <div className="w-1/2 p-4 overflow-y-auto bg-gray-50">
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    </div>
  );
}

export default App;
