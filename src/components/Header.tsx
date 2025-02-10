const DEFAULT_FILENAME = `pgc-newsletter-${new Date().toISOString().split("T")[0]}.html`;

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
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Eye, EyeOff, Newspaper } from "lucide-react";
import React from "react";

interface HeaderProps {
  previewHtml: string;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ previewHtml, isMobile, setIsMobile }: HeaderProps) => {
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
      link.download = DEFAULT_FILENAME;
    }

    setFilename(DEFAULT_FILENAME);
    link.click();
    URL.revokeObjectURL(url);
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
                <MenubarItem>
                  Form JSON...<MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Example Newsletter</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              Save Form...<MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
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
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={downloadHtml}>
                    Export
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
            <MenubarSeparator />
            <MenubarItem>Clear Form...</MenubarItem>
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
