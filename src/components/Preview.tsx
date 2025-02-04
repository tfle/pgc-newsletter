interface PreviewProps {
  previewHtml: string;
}

export const Preview = ({ previewHtml }: PreviewProps) => {
  return (
    <>
      <div className="border bg-white p-4 rounded-lg shadow-md">
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    </>
  );
};
