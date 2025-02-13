# PGC Newsletter

The PGC Newsletter is a regular email newsletter that highlights news and events for postgraduate students at the
University of New South Wales (UNSW). It was previously composed in Mailchimp (see: [April 2022](https://www.arc.unsw.edu.au/uploads/pgc-newsletter-2022-04.html))
before [MJML](https://github.com/mjmlio/mjml) was used to build later iterations (see: [May 2023](https://www.arc.unsw.edu.au/uploads/pgc-newsletter-2023-05_3.html)
and [June - July 2024](https://www.arc.unsw.edu.au/uploads/pgc-newsletter-2024-06-07.html)). This project provides a user-friendly
interface to edit the MJML template and preview the transpiled HTML newsletter. Check it
out: https://pgc-newsletter.vercel.app/

## Getting Started with Development

Run the project locally by following the usual steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/tfle/pgc-newsletter.git
   cd pgc-newsletter
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Project Structure and Key Files

There are few key directories and files in which the majority of the working code lives. The `src`
directory contains the application code, including the three main components: `Header.tsx`, `Editor.tsx`, and `Preview.tsx`. The 
`createHighlightActions.ts` file contain functions for working with the Highlight cards in the Editor component and the
`generateMJML.ts` file contains the logic for stitching the MJML code together.

```plaintext
pgc-newsletter/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Editor.tsx
│   │   ├── Preview.tsx
│   │   └── ...
│   ├── App.tsx
│   ├── createHighlightActions.ts
│   ├── generateMJML.ts
│   └── ...
└── ...
```
