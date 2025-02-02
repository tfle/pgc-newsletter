import React from "react";
import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Plus, Trash2, Star, ArrowUp, ArrowDown } from "lucide-react";
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

  const updateHighlight = (
    index: number,
    field: keyof Highlight,
    value: string | boolean,
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
      featured: false,
    });
    setHighlights(newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...highlights];
    newHighlights.splice(index, 1);
    setHighlights(newHighlights);
  };

  const moveHighlightUp = (index: number) => {
    if (index === 0) return; // Can't move the first item up
    const newHighlights = [...highlights];
    const [removed] = newHighlights.splice(index, 1);
    newHighlights.splice(index - 1, 0, removed); // Insert it before the previous item
    setHighlights(newHighlights);
  };

  const moveHighlightDown = (index: number) => {
    if (index === highlights.length - 1) return; // Can't move the last item down
    const newHighlights = [...highlights];
    const [removed] = newHighlights.splice(index, 1);
    if (index === 0) {
      removed.featured = false; // Only the first highlight can be featured
    }
    newHighlights.splice(index + 1, 0, removed); // Insert it after the next item
    setHighlights(newHighlights);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Left Section: Editor */}
      <div className="w-1/2 p-6 overflow-y-auto bg-white shadow-md border-r">
        <h1 className="text-2xl font-bold mb-6">PGC Newsletter Editor</h1>

        <div className="space-y-6">
          <div>
            <Label htmlFor="newsletterMonth">Newsletter Month</Label>
            <Input
              type="text"
              placeholder="e.g. January"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="message">President's Message</Label>
            <Textarea
              id="message"
              value={presidentMessage}
              onChange={(e) => setPresidentMessage(e.target.value)}
            />
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <Button
                onClick={addHighlight}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Highlight
              </Button>
            </div>

            {/* Highlight Cards */}
            {highlights.map((highlight, index) => (
              <Card key={index} className="bg-gray-50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Highlight {index + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <Toggle
                        pressed={highlight.featured}
                        onPressedChange={(pressed) =>
                          updateHighlight(index, "featured", pressed)
                        }
                      >
                        <Star />
                        {highlight.featured ? "Featured" : "Feature"}
                      </Toggle>
                    )}
                    <Button
                      onClick={() => removeHighlight(index)}
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  {/* Move Up/Down Buttons */}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveHighlightUp(index)}
                      disabled={index === 0} // Disable the "Move Up" button for the first highlight
                    >
                      <ArrowUp size={16} />
                      Move Up
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveHighlightDown(index)}
                      disabled={index === highlights.length - 1} // Disable the "Move Down" button for the last highlight
                    >
                      <ArrowDown size={16} />
                      Move Down
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
