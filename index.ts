import {readFileSync, realpathSync} from "node:fs";
import {parseEnv} from "node:util";
import {env as processEnv, argv, cwd} from "node:process";
import {dirname, join} from "node:path";

export type EnviesEnv = Record<string, string | undefined>;

let initDone = false;
const envObject: EnviesEnv = Object.create(null);

export const env: EnviesEnv = new Proxy(envObject, {
  get: (...args) => {
    if (!initDone) init();
    return Reflect.get(...args);
  },
  set: (target, key, value, receiver) => {
    if (!initDone) init();
    // also set on process.env in case external code relies on it
    Reflect.set(processEnv, key, value);
    return Reflect.set(target, key, value, receiver);
  },
  has: (...args) => {
    if (!initDone) init();
    return Reflect.has(...args);
  },
});

export function loadEnv(files: Array<string>, dir: string): EnviesEnv {
  const obj: EnviesEnv = Object.create(null);
  const workingDir = cwd();

  for (const file of (new Set((files.flatMap(file => [join(dir, file), join(workingDir, file)]))))) {
    let content: string | null = null;
    try { content = readFileSync(file, "utf8"); } catch {}
    if (content) {
      for (const [key, value] of Object.entries(parseEnv(content))) {
        obj[key] = value;
      }
    }
  }

  return obj;
}

function init(): void {
  const scriptDir = dirname(realpathSync(argv[1]));
  const sourceFiles = [".default.env", ".env", ".env.local"];
  Object.assign(envObject, loadEnv(sourceFiles, scriptDir));

  for (const [key, value] of Object.entries(processEnv)) {
    envObject[key] = value;
  }

  initDone = true;
}
