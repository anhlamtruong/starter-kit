import { cli_keywords, main_config_message } from "../config/index.js";
import chalk from "chalk";
export function flags_validations(parsed) {
    const unknownFlags = Object.keys(parsed).filter((key) => key !== "_" &&
        !cli_keywords.boolean.includes(key) &&
        !Object.keys(cli_keywords.alias).includes(key));
    if (unknownFlags.length > 0) {
        console.error(chalk.red(`🚩 Unknown flag(s): ${unknownFlags.join(", ")}`));
        console.log(chalk.yellow("👉 Valid flags:"));
        cli_keywords.boolean.forEach((flag) => {
            var _a;
            const short = (_a = Object.entries(cli_keywords.alias).find(([, long]) => long === `--${flag}`)) === null || _a === void 0 ? void 0 : _a[0];
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
