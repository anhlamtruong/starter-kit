import { capitalize } from "../utils/capitalize.js";

/**
 * Generates a React component template string for a page with a capitalized name.
 *
 * @param name - The base name to use for the component and heading.
 * @returns A string containing a React functional component definition with the capitalized page name.
 */
export function writePageTemplate(name: string): string {
  return `export default function ${capitalize(name)}Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">${capitalize(name)} Page</h1>
    </div>
  );
}`;
}
