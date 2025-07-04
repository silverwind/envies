import {readFileSync} from "node:fs";
import {parseEnv} from "node:util";
import {env as processEnv} from "node:process";

export type EnviesEnv = Record<string, string | undefined>;

let initDone = false;
const envObject: EnviesEnv = {};

export const env: EnviesEnv = new Proxy(envObject, {
  get: (...args) => {
    if (!initDone) init();
    return Reflect.get(...args);
  },
  set: (...args) => {
    if (!initDone) init();
    return Reflect.set(...args);
  }
});

function init(): void {
  for (const file of [".default.env", ".env", ".env.local"]) {
    let content: string | null = null;
    try { content = readFileSync(file, "utf8"); } catch {}
    if (content) {
      for (const [key, value] of Object.entries(parseEnv(content))) {
        envObject[key] = value;
      }
    }
  }

  for (const [key, value] of Object.entries(processEnv)) {
    envObject[key] = value;
  }

  initDone = true;
}
