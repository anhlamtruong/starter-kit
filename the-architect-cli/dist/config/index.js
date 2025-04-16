export const main_config_message = (cli_name, command_name) => {
    return {
        messages: {
            usage: `💥 Usage: npx ${cli_name} ${command_name} <name> [--with-api] [--with-hooks] [--with-components]`,
        },
    };
};
export const cli_keywords = {
    commands: {
        arch: "arch",
    },
    alias: {
        a: "with-api",
        h: "with-hooks",
        c: "with-components",
    },
    boolean: ["with-api", "with-hooks", "with-components"],
};
