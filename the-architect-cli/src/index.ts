#!/usr/bin/env node

import { architectCommand } from "./commands/architect/index.js";
import { main_config_message, cli_keywords } from "./config/index.js";
import { parseArgs } from "./utils/parse-args.js";

const { command, name, flags } = parseArgs(process.argv);

console.log("Command:", command);
console.log("Name:", name);
console.log("Flags:", flags);

if (command in cli_keywords.commands) {
  if (command === cli_keywords.commands.arch) {
    architectCommand({ name: name, flags: flags });
  }
} else {
  const mess = main_config_message(name, command);
  console.log(mess.messages.usage);
}
