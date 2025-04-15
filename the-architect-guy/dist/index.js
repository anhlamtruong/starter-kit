import { architectCommand } from "./commands/architect";
import { config } from "./config";
const args = process.argv.slice(2);
const [command, name, ...flags] = args;
if (command === "arch") {
    architectCommand(name, flags);
}
else {
    const mess = config(name);
    console.log(mess.messages.usage);
}
