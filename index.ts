import {readFileSync} from "node:fs";
import {parseEnv} from "node:util";

let initDone = false;
const configObj: Record<string, string> = {};

export const config: Record<string, string> = new Proxy(configObj, {
  get: (...args) => {
    if (!initDone) init();
    return Reflect.get(...args);
  },
  set: (...args) => {
    if (!initDone) init();
    return Reflect.set(...args);
  }
});

function init() {
  for (const file of [".default.env", ".env", ".env.local"]) {
    let content: string | null = null;
    try { content = readFileSync(file, "utf8"); } catch {}
    if (content) {
      for (const [key, value] of Object.entries(parseEnv(content))) {
        configObj[key] = value;
      }
    }
  }
  initDone = true;
}
