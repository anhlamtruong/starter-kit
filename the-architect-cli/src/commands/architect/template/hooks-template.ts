import { capitalize } from "../utils/capitalize.js";

/**
 * Generates a template string for a React custom hook that logs its initialization.
 *
 * @param name - The base name to use for the generated hook.
 * @returns A string containing the code for a React hook named `use${capitalize(name)}`.
 */
export function writeHooksTemplate(name: string): string {
  return `import { useEffect } from "react";

export function use${capitalize(name)}() {
  useEffect(() => {
    console.log("${name} hook initialized");
  }, []);
}`;
}
