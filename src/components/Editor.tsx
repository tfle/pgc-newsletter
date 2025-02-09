import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { createHighlightActions } from "@/createHighlightActions";
import { Highlight } from "@/types";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import React from "react";

interface EditorProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  subtitle: string;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
  presidentMessage: string;
  setPresidentMessage: React.Dispatch<React.SetStateAction<string>>;
  highlights: Highlight[];
  setHighlights: React.Dispatch<React.SetStateAction<Highlight[]>>;
}

export const Editor = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  presidentMessage,
  setPresidentMessage,
  highlights,
  setHighlights,
}: EditorProps) => {
  const highlightActions = createHighlightActions(highlights, setHighlights);

  return (
    <>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          placeholder="e.g. January PGC Newsletter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          type="text"
          placeholder="e.g. Welcome to T1"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
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

      <Separator className="!my-8" />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Highlights</h2>
        <Button onClick={highlightActions.addHighlight} variant="outline">
          <Plus />
          Add Highlight
        </Button>
      </div>

      {/* Highlight Cards */}
      {highlights.map((highlight, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              {index === 0 ? (
                <Toggle
                  variant="outline"
                  pressed={highlight.featured}
                  onPressedChange={(pressed) =>
                    highlightActions.updateHighlight(index, "featured", pressed)
                  }
                >
                  {index + 1}
                </Toggle>
              ) : (
                <Button size="icon" variant="outline" disabled>
                  {index + 1}
                </Button>
              )}
              {highlight.featured ? (
                <Badge variant="secondary">Featured</Badge>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => highlightActions.moveHighlightUp(index)}
                disabled={index === 0} // Disable the "Move Up" button for the first highlight
              >
                <ArrowUp />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => highlightActions.moveHighlightDown(index)}
                disabled={index === highlights.length - 1} // Disable the "Move Down" button for the last highlight
              >
                <ArrowDown />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={highlight.title}
              onChange={(e) =>
                highlightActions.updateHighlight(index, "title", e.target.value)
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
                highlightActions.updateHighlight(index, "link", e.target.value)
              }
            />
            <CardFooter className="flex justify-end p-0">
              <Button
                size="icon"
                onClick={() => highlightActions.removeHighlight(index)}
                variant="outline"
              >
                <Trash2 />
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
