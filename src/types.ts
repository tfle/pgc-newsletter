export interface Highlight {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  featured: boolean;
}

export interface FormData {
  title: string;
  presidentMessage: string;
  highlights: Highlight[];
}
