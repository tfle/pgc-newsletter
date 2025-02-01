export interface Highlight {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  featured: false;
}

export interface FormData {
  month: string;
  presidentMessage: string;
  highlights: Highlight[];
}
