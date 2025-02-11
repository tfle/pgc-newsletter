const DEFAULT_FILENAME = `pgc-newsletter-${new Date().toISOString().split("T")[0]}`;

import exampleNewsletter from "@/assets/exampleNewsletter.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Highlight } from "@/types.ts";
import { Eye, EyeOff, Newspaper } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  subtitle: string;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
  presidentMessage: string;
  setPresidentMessage: React.Dispatch<React.SetStateAction<string>>;
  highlights: Highlight[];
  setHighlights: React.Dispatch<React.SetStateAction<Highlight[]>>;
  previewHtml: string;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  presidentMessage,
  setPresidentMessage,
  highlights,
  setHighlights,
  previewHtml,
  isMobile,
  setIsMobile,
}: HeaderProps) => {
  const [checked, setChecked] = React.useState(true);
  const [filename, setFilename] = React.useState(DEFAULT_FILENAME);

  const downloadHtml = () => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    if (filename && filename.endsWith(".html")) {
      link.download = filename;
    } else if (filename) {
      link.download = `${filename}.html`;
    } else {
      link.download = `${DEFAULT_FILENAME}.html`;
    }

    setFilename(DEFAULT_FILENAME);
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadJson = () => {
    const blob = new Blob(
      [JSON.stringify({ title, subtitle, presidentMessage, highlights })],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    if (filename && filename.endsWith(".json")) {
      link.download = filename;
    } else if (filename) {
      link.download = `${filename}.json`;
    } else {
      link.download = `${DEFAULT_FILENAME}.json`;
    }

    setFilename(DEFAULT_FILENAME);
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setPresidentMessage("");
    setHighlights([
      {
        title: "",
        description: "",
        imageUrl: "",
        link: "",
        dateTime: "",
        featured: true,
      },
    ]);
  };

  const uploadJson = () => {
    const input = document.getElementById("jsonFile") as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const data = JSON.parse(event.target.result as string);
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setPresidentMessage(data.presidentMessage);
          setHighlights(data.highlights);
        }
      };
      reader.readAsText(file);
    }
  };

  const loadExample = async () => {
    setTitle(exampleNewsletter.title);
    setSubtitle(exampleNewsletter.subtitle);
    setPresidentMessage(exampleNewsletter.presidentMessage);
    setHighlights(exampleNewsletter.highlights);
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-white px-8">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Newspaper size={16} className="mr-2" />
            PGC Newsletter
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Open</MenubarSubTrigger>
              <MenubarSubContent>
                {/* Open Form */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <MenubarItem onSelect={(e) => e.preventDefault()}>
                      JSON Form...
                    </MenubarItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Open JSON Form</AlertDialogTitle>
                      <AlertDialogDescription>
                        Open a previously saved JSON form to continue editing.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                      <Label htmlFor="jsonFile">Saved JSON Form</Label>
                      <Input id="jsonFile" type="file" accept=".json" />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={uploadJson}>
                        Open
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <MenubarSeparator />
                <MenubarItem onClick={loadExample}>
                  Example Newsletter
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            {/* Save Form */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MenubarItem onSelect={(e) => e.preventDefault()}>
                  Save Form...
                </MenubarItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Save Form</AlertDialogTitle>
                  <AlertDialogDescription>
                    Save your form progress as a JSON file to continue editing
                    later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                  <Label htmlFor="filename">Filename</Label>
                  <Input
                    id="filename"
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setFilename(DEFAULT_FILENAME)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={downloadJson}>
                    Save
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <MenubarSeparator />

            {/* Export Newsletter */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MenubarItem onSelect={(e) => e.preventDefault()}>
                  Export Newsletter...
                </MenubarItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Export Newsletter</AlertDialogTitle>
                  <AlertDialogDescription>
                    Export the newsletter as an HTML file.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                  <Label htmlFor="filename">Filename</Label>
                  <Input
                    id="filename"
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setFilename(DEFAULT_FILENAME)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={downloadHtml}>
                    Export
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* TODO: Preview Settings

            <MenubarSub>
              <MenubarSubTrigger>Preview Settings</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarCheckboxItem
                  checked={checked}
                  onCheckedChange={setChecked}
                >
                  Desktop Preview
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={checked}
                  onCheckedChange={setChecked}
                >
                  Mobile Preview
                </MenubarCheckboxItem>
              </MenubarSubContent>
            </MenubarSub>

            */}

            <MenubarSeparator />

            {/* Reset Form */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MenubarItem onSelect={(e) => e.preventDefault()}>
                  Reset Form...
                </MenubarItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all form fields?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action is permanent and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetForm}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Button variant="outline" onClick={() => setIsMobile((prev) => !prev)}>
        {isMobile ? <EyeOff /> : <Eye />}
        Preview
      </Button>
    </div>
  );
};
