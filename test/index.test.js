import hydrateSchema from "../src/index.ts";

test("hydrate schema with simple schema", () => {
  const schema = {
    string: "3",
    number: 42,
    obj: {
      str: "asd",
      arr: [1, 2, 3],
      emptyArr: [],
    },
    date: new Date(),
  };

  expect(hydrateSchema(schema)({})).toStrictEqual(schema);
});

test("hydrate schema with complex schema", () => {
  const schema = {
    bar: "3",
    fn: (obj) => obj.foo.toUpperCase(),
    arr: [1, (obj) => Number(obj.other) + 1, 3],
    obj: {
      subbar: 42,
      subfn: (obj) => String(obj.obj.subfoo),
      emptyArr: [],
    },
  };

  const obj = {
    foo: "asd",
    other: "13",
    obj: {
      subfoo: 11,
    },
  };

  expect(hydrateSchema(schema)(obj)).toStrictEqual({
    bar: "3",
    fn: "ASD",
    arr: [1, 14, 3],
    obj: {
      subbar: 42,
      subfn: "11",
      emptyArr: [],
    },
  });
});
