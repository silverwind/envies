import {readFileSync, realpathSync} from "node:fs";
import {parseEnv} from "node:util";
import {env as processEnv, argv, cwd} from "node:process";
import {dirname, join} from "node:path";

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
  const scriptDir = dirname(realpathSync(argv[1]));
  const workingDir = cwd();

  const files = [".default.env", ".env", ".env.local"].flatMap(file => {
    return [join(scriptDir, file), join(workingDir, file)];
  });

  for (const file of files) {
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
