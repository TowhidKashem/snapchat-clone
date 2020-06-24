// Escape a user input string for use in a REGEX search
export const escapeRegex = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
