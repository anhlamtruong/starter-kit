import { cli_keywords } from "../config/index.js";
import minimist from "minimist";
import { flags_validations } from "./flags-validation.js";

/**
 * Parses command-line arguments and returns the command, name, and parsed flags.
 *
 * Extracts the first two positional arguments as `command` and `name`, and validates the parsed flags. Exits the process with code 1 if validation fails.
 *
 * @param argv - The raw argument vector, typically from process.argv.
 * @returns An object containing the extracted command, name, and all parsed flags.
 *
 * @remark The process will terminate with exit code 1 if flag validation fails.
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
