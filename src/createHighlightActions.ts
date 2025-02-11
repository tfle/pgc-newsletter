import { Highlight } from "@/types.ts";

export const createHighlightActions = (
  highlights: Highlight[],
  setHighlights: React.Dispatch<React.SetStateAction<Highlight[]>>,
) => {
  const updateHighlight = (
    index: number,
    field: keyof Highlight,
    value: string | boolean,
  ) => {
    const newHighlights = [...highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setHighlights(newHighlights);
  };

  const addHighlight = () => {
    const newHighlights = [...highlights];
    newHighlights.push({
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      dateTime: "",
      featured: false,
    });
    setHighlights(newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...highlights];
    newHighlights.splice(index, 1);
    setHighlights(newHighlights);
  };

  const moveHighlightUp = (index: number) => {
    if (index === 0) return; // Can't move the first item up
    const newHighlights = [...highlights];
    const [removed] = newHighlights.splice(index, 1);
    if (index - 1 === 0) {
      newHighlights[0].featured = false; // Remove featured status from the previous first highlight
    }
    newHighlights.splice(index - 1, 0, removed); // Insert it before the previous item
    setHighlights(newHighlights);
  };

  const moveHighlightDown = (index: number) => {
    if (index === highlights.length - 1) return; // Can't move the last item down
    const newHighlights = [...highlights];
    const [removed] = newHighlights.splice(index, 1);
    if (index === 0) {
      removed.featured = false; // Only the first highlight can be featured
    }
    newHighlights.splice(index + 1, 0, removed); // Insert it after the next item
    setHighlights(newHighlights);
  };

  return {
    updateHighlight,
    addHighlight,
    removeHighlight,
    moveHighlightUp,
    moveHighlightDown,
  };
};
