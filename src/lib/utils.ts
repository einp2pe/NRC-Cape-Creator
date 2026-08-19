type ClassNameTypes = string | false | undefined | null;

export function cn(...inputs: ClassNameTypes[]) {
  return inputs.filter(Boolean).join(" ");
}
