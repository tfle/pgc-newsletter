export interface Highlight {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  featured: boolean;
}

export interface FormData {
  title: string;
  subtitle: string;
  presidentMessage: string;
  highlights: Highlight[];
}
