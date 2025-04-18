import { cli_keywords, main_config_message } from "../config/index.js";
import chalk from "chalk";
import minimist from "minimist";

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
