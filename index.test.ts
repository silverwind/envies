import {config} from "./index.ts";

test("works", () => {
  expect(config.FOO).toMatchInlineSnapshot(`"bar baz"`);
  expect(config.BAR).toMatchInlineSnapshot(`
    "foo
    bar
    baz"
  `);
  expect(config.QUX).toMatchInlineSnapshot(`undefined`);
});
