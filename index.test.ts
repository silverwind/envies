import {config} from "./index.ts";

test("works", () => {
  expect(config.FOO).toEqual("bar baz");
});
