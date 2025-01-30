// types.ts
export interface Highlight {
  title: string;
  description: string;
  imageURL: string;
  link: string;
}

export interface Event {
  title: string;
  description: string;
  date: string;
  imageURL: string;
  link: string;
}

export interface FormData {
  month: string;
  presidentMessage: string;
  highlights: Highlight[];
  events: Event[];
}
