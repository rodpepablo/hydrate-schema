# hydrate-schema
Build an object by parsing another using different funcions for every new property

### Installation

```{bash}
npm install hydrate-schema
```

### Examples

This library is supposed to be used in a functional programing context, hence the use of ramda as an utility library in the following examples. However, using ramda, or an alternative, is not necessary.

```{js}
  import hydrateSchema from 'hydrate-schema'
  // or const hydrateSchema = require('hydrate-schema')

  const schema = {
    bar: '3',
    fn: R.pipe(R.prop('foo'), R.toUpper),
    arr: [ 1, R.pipe(R.prop('other'), Number, R.add(1)), 3],
    obj: {
      subbar: 42,
      subfn: R.pipe(R.path(['obj', 'subfoo']), String),
      emptyArr: []
    }
  }

  const obj = {
    foo: 'asd',
    other: '13',
    obj: {
      subfoo: 11
    }
  }

  hydrateSchema(schema, model)
  // or hydrateSchema(schema)(model)

  /* Expected result
  
  {
    bar: '3',
    fn: 'ASD',
    arr: [ 1, 14, 3 ],
    obj: {
      subbar: 42,
      subfn: '11',
      emptyArr: []
    }
  }
  
  */
```

Since hydrateSchema is curried, you can compose different schemas to create a bigger one

```{js}

  const subSchema = hydrateSchema({
    a: '3',
    b: R.pipe(R.prop('foo'), R.toUpper)
  })

  const createFooObject = hydrateSchema({
    c: subSchema,
    d: Number
  })
  
```

### Test

```{bash}
npm run prepare # Only if there are changes to be transcompiled
npm run test
```
