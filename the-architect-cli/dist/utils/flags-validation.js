import { cli_keywords } from "../config/index.js";
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
            console.log(chalk.redBright(short));
            const aliasString = short ? chalk.cyan(`(-${short})`) : "";
            console.log(chalk.green(`  --${flag}`), aliasString);
        });
        const [command] = parsed._;
        const usageMessage = flags_config_message("tac", command || "command", cli_keywords.boolean.map((flag) => {
            return flag;
        })).flags_error.correction;
        console.log("\n" + chalk.blue(usageMessage));
        return false;
    }
    return true;
}
export const flags_config_message = (cli_name, command_name, flags) => {
    return {
        flags_error: {
            correction: chalk.blue(`✅ npx ${cli_name} ${command_name} ${flags
                .map((flag) => {
                return `[--${flag}]`;
            })
                .join(" ")}`),
        },
    };
};
