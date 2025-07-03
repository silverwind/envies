import {readFileSync} from "node:fs";
import {parseEnv} from "node:util";
import {env} from "node:process";

export type Config = Record<string, string | undefined>;

let initDone = false;
const configObj: Config = {};

export const config: Config = new Proxy(configObj, {
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

  for (const [key, value] of Object.entries(env)) {
    configObj[key] = value;
  }
  initDone = true;
}
