import { cli_keywords, main_config_message } from "../config/index.js";
import chalk from "chalk";
import minimist from "minimist";

/**
 * Validates parsed CLI flags against known boolean flags and their aliases.
 *
 * Logs an error and usage correction if any unknown flags are detected, and returns `false`. Returns `true` if all flags are valid.
 *
 * @param parsed - The parsed command-line arguments.
 * @returns `true` if all flags are recognized; otherwise, `false`.
 */
export function flags_validations(parsed: minimist.ParsedArgs): boolean {
  const unknownFlags = Object.keys(parsed).filter(
    (key) =>
      key !== "_" &&
      !cli_keywords.boolean.includes(key) &&
      !Object.keys(cli_keywords.alias).includes(key)
  );
  if (unknownFlags.length > 0) {
    console.error(chalk.red(`🚩 Unknown flag(s): ${unknownFlags.join(", ")}`));
    printValidFlags();

    const [command] = parsed._;
    const usageMessage = flags_config_message(
      "tac",
      command || "command",
      cli_keywords.boolean.map((flag) => {
        return flag;
      })
    ).flags_error.correction;
    console.log("\n" + chalk.blue(usageMessage));
    return false;
  }

  return true;
}

const flags_config_message = (
  cli_name: string,
  command_name: string,
  flags: string[]
) => {
  return {
    flags_error: {
      correction: chalk.green(
        `✅ Correct syntax: npx ${cli_name} ${command_name} ${flags
          .map((flag) => {
            return `[--${flag}]`;
          })
          .join(" ")}`
      ),
    },
  };
};

/**
 * Displays a formatted list of all valid boolean CLI flags and their short aliases.
 *
 * Each flag is printed in green, with its long form (`--flag`) and, if available, its short form (`-x`).
 */
function printValidFlags() {
  console.log(chalk.yellow("👉 Valid flags:"));

  cli_keywords.boolean.forEach((flag) => {
    const short = Object.entries(cli_keywords.alias).find(
      ([_, longName]) => longName === flag
    )?.[0];

    const longFormatted = chalk.green(`  --${flag}`);
    const shortFormatted = short ? chalk.green(`(-${short})`) : "";

    console.log(`${longFormatted} ${shortFormatted}`);
  });
}
