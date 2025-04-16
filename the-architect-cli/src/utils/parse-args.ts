import { cli_keywords } from "../config/index.js";
import minimist from "minimist";
import { flags_validations } from "./flags-validation.js";

/**
 * Parses CLI arguments using minimist and returns structured command, name, and flags.
 */
export function parseArgs(argv: string[]) {
  const parsed = minimist(argv.slice(2), {
    alias: cli_keywords.alias,
    boolean: cli_keywords.boolean,
  });

  if (!flags_validations(parsed)) {
    process.exit(1);
  }

  const [command, name] = parsed._;
  return {
    command,
    name,
    flags: parsed,
  };
}
