import {env, type EnviesEnv} from "./index.ts";
import {env as processEnv} from "node:process";

const freshModule = (id: string) => import(/* @vite-ignore */ `./index.ts?${id}`) as Promise<{env: EnviesEnv}>;

test("works", async () => {
  expect(env.FOO).toMatchInlineSnapshot(`"bar baz"`);
  expect(env.BAR).toMatchInlineSnapshot(`
    "foo
    bar
    baz"
  `);
  expect(env.QUX).toMatchInlineSnapshot(`undefined`);
  expect(env.USER || env.USERNAME).toBeTruthy();
  expect("FOO" in env).toEqual(true);
  expect(Object.keys(env).length).toBeGreaterThanOrEqual(2);
  expect(Object.keys((await freshModule("keys")).env)).toContain("FOO");
  expect(Object.hasOwn((await freshModule("hasOwn")).env, "FOO")).toEqual(true);
  const {env: deleteEnv} = await freshModule("delete");
  delete deleteEnv.FOO;
  expect(deleteEnv.FOO).toBeUndefined();
});

test("writing", () => {
  env.WRITE = "write";
  expect(env.WRITE).toEqual("write");
  expect(processEnv.WRITE).toEqual("write");
});
