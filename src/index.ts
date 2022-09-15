import { curry } from "@typed/curry";

const is = (Ctor: any, val: any): boolean => {
  return (val != null && val.constructor === Ctor) || val instanceof Ctor;
};

const hydrateSchema = curry((schema: any, model: any): any => {
  const hydrated: Record<string, any> = {};

  if (is(Array, schema)) {
    return schema.map((value: any) => hydrateSchema(value, model));
  } else if (typeof schema === "object") {
    for (let prop in schema) {
      if (typeof schema[prop] === "function") {
        hydrated[prop] = schema[prop](model);
      } else if (schema[prop] == null) {
        hydrated[prop] = schema[prop];
      } else if (is(Array, schema[prop])) {
        hydrated[prop] = schema[prop].map((value: any) =>
          hydrateSchema(value, model)
        );
      } else if (is(Date, schema[prop])) {
        hydrated[prop] = schema[prop];
      } else if (typeof schema[prop] === "object") {
        hydrated[prop] = hydrateSchema(schema[prop], model);
      } else {
        hydrated[prop] = schema[prop];
      }
    }
    return hydrated;
  } else {
    return hydrateSchema({ schema }, model).schema;
  }
});

export default hydrateSchema;
