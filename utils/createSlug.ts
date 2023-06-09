export default function createSlug(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (match) => {
      switch (match) {
        case "ą":
          return "a";
        case "ć":
          return "c";
        case "ę":
          return "e";
        case "ł":
          return "l";
        case "ń":
          return "n";
        case "ó":
          return "o";
        case "ś":
          return "s";
        case "ź":
          return "z";
        case "ż":
          return "z";
        default:
          return match;
      }
    })
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  return slug;
}
