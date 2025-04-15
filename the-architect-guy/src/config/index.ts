export const config = (cli_name: string) => {
  return {
    messages: {
      usage: `Usage: npx ${cli_name} add <name> [--with-api] [--with-hooks] [--with-components]`,
    },
  };
};
