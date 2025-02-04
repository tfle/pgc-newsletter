import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface HeaderProps {
  previewHtml: string;
}

export const Header = ({ previewHtml }: HeaderProps) => {
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
    <div className="sticky top-0 bg-white border-b z-50 p-3">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={downloadHtml}
        >
          <Download />
          Download HTML
        </Button>
      </div>
    </div>
  );
};
