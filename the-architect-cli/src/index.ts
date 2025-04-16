#!/usr/bin/env node

import { architectCommand } from "./commands/architect/index.js";
import { config } from "./config/index.js";

const args = process.argv.slice(2);
const [command, name, ...flags] = args;

console.log("RAW args:", process.argv);
console.log("Parsed args:", args);
console.log("Flags:", flags);

if (command === "arch") {
  console.log(`Passing flags: ${flags}`);
  architectCommand(name, flags);
} else {
  const mess = config(name);
  console.log(mess.messages.usage);
}
