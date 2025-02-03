interface PreviewProps {
  previewHtml: string;
}

export const Preview = ({ previewHtml }: PreviewProps) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Email Preview</h2>
      <div className="border bg-white p-4 rounded-lg shadow-md">
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    </>
  );
};
