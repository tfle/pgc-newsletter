import React from "react";
import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { Plus, Trash2 } from "lucide-react";
import { Highlight, Event, FormData } from "./types";
import mjml2html from "mjml-browser";
import { generateMJML } from "./generate-mjml";

function App() {
  const [formData, setFormData] = React.useState<FormData>({
    month: "",
    presidentMessage: "",
    highlights: [
      {
        title: "",
        description: "",
        imageURL: "",
        link: "",
      },
    ],
    events: [
      {
        title: "",
        description: "",
        date: "",
        imageURL: "",
        link: "",
      },
    ],
  });

  const [previewHtml, setPreviewHtml] = React.useState("");

  React.useEffect(() => {
    const mjmlString = generateMJML(formData);
    const { html } = mjml2html(mjmlString);
    setPreviewHtml(html);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof FormData,
    index?: number,
    field?: keyof Highlight | keyof Event,
  ) => {
    if (index !== undefined && field !== undefined) {
      const newData = { ...formData };
      if (section === "highlights") {
        (newData.highlights[index] as Highlight)[field as keyof Highlight] =
          e.target.value;
      } else if (section === "events") {
        (newData.events[index] as Event)[field as keyof Event] = e.target.value;
      }
      setFormData(newData);
    } else {
      setFormData({ ...formData, [section]: e.target.value });
    }
  };

  const addItem = (section: string) => {
    const newData = { ...formData };
    if (section === "highlights") {
      newData.highlights.push({
        title: "",
        description: "",
        imageURL: "",
        link: "",
      });
    } else if (section === "events") {
      newData.events.push({
        title: "",
        description: "",
        date: "",
        imageURL: "",
        link: "",
      });
    }
    setFormData(newData);
  };

  const removeItem = (section: string, index: number) => {
    const newData = { ...formData };
    if (section === "highlights") {
      newData.highlights.splice(index, 1);
    } else if (section === "events") {
      newData.events.splice(index, 1);
    }
    setFormData(newData);
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
            value={formData.month}
            onChange={(e) => handleChange(e, "month")}
          />
          <Label htmlFor="message">President's Message</Label>
          <Textarea
            id="message"
            value={formData.presidentMessage}
            onChange={(e) => handleChange(e, "presidentMessage")}
          />
        </div>

        {/* Highlights */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Highlights</h2>
          <Button onClick={() => addItem("highlights")} variant="outline">
            <Plus />
            Add Highlight
          </Button>

          {/* Highlight Cards */}
          {formData.highlights.map((highlight, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => removeItem("highlights", index)}
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
                    handleChange(e, "highlights", index, "title")
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={highlight.description}
                  onChange={(e) =>
                    handleChange(e, "highlights", index, "description")
                  }
                />
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={highlight.imageURL}
                  onChange={(e) =>
                    handleChange(e, "highlights", index, "imageURL")
                  }
                />
                <Input
                  type="url"
                  placeholder="Link URL"
                  value={highlight.link}
                  onChange={(e) => handleChange(e, "highlights", index, "link")}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Events Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">What's On</h2>
          <Button onClick={() => addItem("events")} variant="outline">
            <Plus />
            Add Event
          </Button>

          {/* Event Cards */}
          {formData.events.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => removeItem("events", index)}
                    variant="ghost"
                  >
                    <Trash2 />
                  </Button>
                </div>
                <Input
                  type="text"
                  placeholder="Event Title"
                  value={event.title}
                  onChange={(e) => handleChange(e, "events", index, "title")}
                />
                <Textarea
                  placeholder="Event Description"
                  value={event.description}
                  onChange={(e) =>
                    handleChange(e, "events", index, "description")
                  }
                />
                <Input
                  type="date"
                  placeholder="Event Date"
                  value={event.date}
                  onChange={(e) => handleChange(e, "events", index, "date")}
                />
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={event.imageURL}
                  onChange={(e) => handleChange(e, "events", index, "imageURL")}
                />
                <Input
                  type="url"
                  placeholder="Link URL"
                  value={event.link}
                  onChange={(e) => handleChange(e, "events", index, "link")}
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
