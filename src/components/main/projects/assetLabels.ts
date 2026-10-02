// Human-readable names for the logo files referenced in projects.json,
// used for alt text and accessible link labels.
const LABELS: Record<string, string> = {
  android: "Android",
  cpp: "C++",
  github: "GitHub",
  java: "Java",
  jscript: "JavaScript",
  kotlin: "Kotlin",
  live: "Live site",
  llms: "LLMs",
  python: "Python",
  react: "React",
  typescript: "TypeScript",
};

export const labelForAsset = (path: string): string => {
  const base = path.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "") ?? "";
  return LABELS[base.toLowerCase()] ?? base;
};
