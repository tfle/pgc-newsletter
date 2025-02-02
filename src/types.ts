export interface Highlight {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  featured: boolean;
}

export interface FormData {
  month: string;
  presidentMessage: string;
  highlights: Highlight[];
}
