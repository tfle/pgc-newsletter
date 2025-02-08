import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { createHighlightActions } from "@/createHighlightActions";
import { Highlight } from "@/types";
import { ArrowDown, ArrowUp, Plus, Star, Trash2 } from "lucide-react";
import React from "react";

interface EditorProps {
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  presidentMessage: string;
  setPresidentMessage: React.Dispatch<React.SetStateAction<string>>;
  highlights: Highlight[];
  setHighlights: React.Dispatch<React.SetStateAction<Highlight[]>>;
}

export const Editor = ({
  month,
  setMonth,
  presidentMessage,
  setPresidentMessage,
  highlights,
  setHighlights,
}: EditorProps) => {
  const highlightActions = createHighlightActions(highlights, setHighlights);

  return (
    <>
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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Highlights</h2>
            <Button
              onClick={highlightActions.addHighlight}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus />
              Add Highlight
            </Button>
          </div>

          {/* Highlight Cards */}
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-gray-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>
                  <span className="mr-2 text-gray-500">#{index + 1}</span>{" "}
                  {highlight.title || "Untitled"}
                </CardTitle>
                <div className="flex gap-2">
                  {index === 0 && (
                    <Toggle
                      pressed={highlight.featured}
                      onPressedChange={(pressed) =>
                        highlightActions.updateHighlight(
                          index,
                          "featured",
                          pressed,
                        )
                      }
                    >
                      <Star />
                      {highlight.featured ? "Featured" : "Feature"}
                    </Toggle>
                  )}
                  <Button
                    onClick={() => highlightActions.removeHighlight(index)}
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
                    highlightActions.updateHighlight(
                      index,
                      "title",
                      e.target.value,
                    )
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={highlight.description}
                  onChange={(e) =>
                    highlightActions.updateHighlight(
                      index,
                      "description",
                      e.target.value,
                    )
                  }
                />
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={highlight.imageUrl}
                  onChange={(e) =>
                    highlightActions.updateHighlight(
                      index,
                      "imageUrl",
                      e.target.value,
                    )
                  }
                />
                <Input
                  type="url"
                  placeholder="Link URL"
                  value={highlight.link}
                  onChange={(e) =>
                    highlightActions.updateHighlight(
                      index,
                      "link",
                      e.target.value,
                    )
                  }
                />
                {/* Move Up/Down Buttons */}
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => highlightActions.moveHighlightUp(index)}
                    disabled={index === 0} // Disable the "Move Up" button for the first highlight
                  >
                    <ArrowUp />
                    Move Up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => highlightActions.moveHighlightDown(index)}
                    disabled={index === highlights.length - 1} // Disable the "Move Down" button for the last highlight
                  >
                    <ArrowDown />
                    Move Down
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
