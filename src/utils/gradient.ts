import type { GradientDirection } from "@/data/templates";

export function toCssGradient(
  colors: string[],
  direction: GradientDirection
): string {
  if (colors.length === 0) return "transparent";
  if (colors.length === 1) return colors[0];

  const angle = direction === "vertical" ? "180deg" : "90deg";
  return `linear-gradient(${angle}, ${colors.join(", ")})`;
}
