/**
 * Generates a Next.js API route template with a GET handler that returns a JSON message indicating the specified API is working.
 *
 * @param name - The name to include in the generated API route message.
 * @returns A string containing the API route template code.
 */
export function writeApiTemplate(name: string): string {
  return `import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "${name} API working!" });
}`;
}
