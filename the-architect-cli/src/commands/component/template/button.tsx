"use client";
import * as React from "react";

/**
 * Renders a button element containing the provided child content.
 *
 * @param children - The content to display inside the button.
 */
export function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
