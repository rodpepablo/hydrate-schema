
import curry from 'ramda/src/curry'
import __ from 'ramda/src/__'
import map from 'ramda/src/map'
import is from 'ramda/src/is'

// Creates and object with data from "model" as defined by the selectors and parsers in "schema"
const hydrateSchema = curry((schema, model) => {
  const hydrated = {}

  if (is(Array, schema)) {
    return map(hydrateSchema(__, model), schema)
  } else if (typeof schema === 'object') {
    for (let prop in schema) {
      if (typeof schema[prop] === 'function') {
        hydrated[prop] = schema[prop](model)
      } else if (schema[prop] == null) {
        hydrated[prop] = schema[prop]
      } else if (is(Array, schema[prop])) {
        hydrated[prop] = map(hydrateSchema(__, model), schema[prop])
      } else if (is(Date, schema[prop])) {
        hydrated[prop] = schema[prop]
      } else if (typeof schema[prop] === 'object') {
        hydrated[prop] = hydrateSchema(schema[prop], model)
      } else {
        hydrated[prop] = schema[prop]
      }
    }
    return hydrated
  } else {
    return hydrateSchema({ schema }, model).schema
  }
})

export default hydrateSchema

