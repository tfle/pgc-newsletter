import { Button } from "@/components/ui/button";
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

  const downloadHtml = () => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `pgc-newsletter-${date}.html`;
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
            <MenubarItem onClick={downloadHtml}>
              Export Newsletter...
            </MenubarItem>
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
