import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { capitalize } from "./utils/capitalize";
import { messages, file_directory, file_naming, flags as flags_options, folder_naming, } from "./config/index";
import { writeApiTemplate } from "./template/api-template";
import { writeHooksTemplate } from "./template/hooks-template";
import { writePageTemplate } from "./template/page-template";
import { writeComponentTemplate } from "./template/component-template";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export function architectCommand(name, flags) {
    if (!name) {
        console.error(messages.noName);
        process.exit(1);
    }
    const options = {
        withApi: flags.includes(flags_options.api),
        withHooks: flags.includes(flags_options.hooks),
        withComponents: flags.includes(flags_options.components),
    };
    const routeFolder = path.join(process.cwd(), file_directory.main_directory, name);
    if (fs.existsSync(routeFolder)) {
        console.error(messages.alreadyExists(name));
        process.exit(1);
    }
    fs.mkdirSync(routeFolder, { recursive: true });
    fs.writeFileSync(path.join(routeFolder, file_naming.page), writePageTemplate(name));
    if (options.withApi) {
        const apiPath = path.join(routeFolder, folder_naming.api);
        fs.mkdirSync(apiPath);
        fs.writeFileSync(path.join(apiPath, file_naming.route), writeApiTemplate(name));
    }
    if (options.withHooks) {
        const hooksPath = path.join(routeFolder, folder_naming.hooks);
        fs.mkdirSync(hooksPath);
        fs.writeFileSync(path.join(hooksPath, `use${capitalize(name)}.ts`), writeHooksTemplate(name));
    }
    if (options.withComponents) {
        const componentsPath = path.join(routeFolder, file_naming.components);
        fs.mkdirSync(componentsPath);
        fs.writeFileSync(path.join(componentsPath, `${capitalize(name)}Widget.tsx`), writeComponentTemplate(name));
    }
    console.log(`✅ Microservice '${name}' created successfully.`);
}
