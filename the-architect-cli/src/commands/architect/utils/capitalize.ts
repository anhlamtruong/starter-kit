/**
 * Returns a new string with the first character of the input capitalized.
 *
 * @param str - The string to capitalize.
 * @returns The input string with its first character in uppercase.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
