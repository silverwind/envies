import {env} from "./index.ts";
import {env as processEnv} from "node:process";

test("works", () => {
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
});

test("writing", () => {
  env.WRITE = "write"
  expect(env.WRITE).toEqual("write")
  expect(processEnv.WRITE).toEqual("write")
});
