// Escape a user input string for use in a REGEX search
export const escapeRegex = (string: string): string =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const uuidv4 = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const rand = (Math.random() * 16) | 0;
    const val = char === 'x' ? rand : (rand & 0x3) | 0x8;
    return val.toString(16);
  });
