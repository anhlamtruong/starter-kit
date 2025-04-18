import { capitalize } from "../utils/capitalize.js";

/**
 * Generates a string template for a React functional component named after the capitalized input with "Widget" appended.
 *
 * @param name - The base name to use for the component.
 * @returns A string containing the source code for a React component that renders a div with the capitalized name and "Widget".
 */
export function writeComponentTemplate(name: string): string {
  return `export function ${capitalize(name)}Widget() {
    return <div>${capitalize(name)} Widget</div>;
  }`;
}
