// Flattens Portable Text blocks into a plain-text string, useful for
// meta descriptions / OG tags where rich text can't be rendered.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toPlainText(blocks: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) {
        return "";
      }
      return block.children
        .map((child: { text?: string }) => child.text || "")
        .join("");
    })
    .filter(Boolean)
    .join(" ")
    .trim();
}
