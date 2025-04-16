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

    console.log(chalk.yellow("👉 Valid flags:"));
    cli_keywords.boolean.forEach((flag) => {
      const short = Object.entries(cli_keywords.alias).find(
        ([, long]) => long === `--${flag}`
      )?.[0];
      const aliasString = short ? chalk.cyan(`(-${short})`) : "";
      console.log(chalk.green(`  --${flag}`), aliasString);
    });

    const [command] = parsed._;
    const usageMessage = main_config_message("tac", command || "command")
      .messages.usage;
    console.log("\n" + chalk.blue(usageMessage));
    return false;
  }

  return true;
}
