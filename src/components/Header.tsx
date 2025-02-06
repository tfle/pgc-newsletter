import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Newspaper } from "lucide-react";
import React from "react";

//Editor> Save progress, Upload saved, Load Example?
//Preview> View as Desktop, View as Mobile, Download HTML

interface HeaderProps {
  previewHtml: string;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ previewHtml, isMobile, setIsMobile }: HeaderProps) => {
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
    <div className="sticky top-0 bg-white border-b z-50 px-8 py-4">
      <div className="flex items-center justify-between">
        <Button variant="outline">
          <Newspaper />
          PGC Newsletter
        </Button>
        <Button variant="outline" onClick={() => setIsMobile((prev) => !prev)}>
          {isMobile ? <EyeOff /> : <Eye />}
          Preview
        </Button>
      </div>
    </div>
  );
};
