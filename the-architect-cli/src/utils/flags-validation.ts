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
    //!ERROR
    //* tac arch test1 -lasdf
    // 🚩 Unknown flag(s): l, s, d, f
    // 👉 Valid flags:
    // undefined
    // 👉 Valid flags:
    // undefined
    // 👉 Valid flags:
    // 👉 Valid flags:
    // undefined
    //   --with-api
    // 👉 Valid flags:
    // undefined
    // 👉 Valid flags:
    // 👉 Valid flags:
    // 👉 Valid flags:
    // undefined
    //   --with-api
    // undefined
    //   --with-hooks
    // undefined
    //   --with-components

    // ✅ npx tac arch [--with-api] [--with-hooks] [--with-components]
    // PS C:\Users\BAURegistrar\Downloads\Code\starter-kit\the-architect-cli>
    console.log(chalk.yellow("👉 Valid flags:"));
    cli_keywords.boolean.forEach((flag) => {
      const short = Object.entries(cli_keywords.alias).find(
        ([, long]) => long === `--${flag}`
      )?.[0];
      console.log(chalk.redBright(short));
      const aliasString = short ? chalk.cyan(`(-${short})`) : "";
      console.log(chalk.green(`  --${flag}`), aliasString);
    });

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
export const flags_config_message = (
  cli_name: string,
  command_name: string,
  flags: string[]
) => {
  return {
    flags_error: {
      correction: chalk.blue(
        `✅ npx ${cli_name} ${command_name} ${flags
          .map((flag) => {
            return `[--${flag}]`;
          })
          .join(" ")}`
      ),
    },
  };
};
