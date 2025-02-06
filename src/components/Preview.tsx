interface PreviewProps {
  previewHtml: string;
}

export const Preview = ({ previewHtml }: PreviewProps) => {
  return <div dangerouslySetInnerHTML={{ __html: previewHtml }} />;
};
