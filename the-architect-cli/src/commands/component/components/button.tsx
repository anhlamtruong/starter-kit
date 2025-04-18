"use client";

import * as React from "react";

/**
 * Renders a standard HTML button containing the provided child elements.
 *
 * @param children - The content to display inside the button.
 */
export function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
