# Joi schema generator (work in progress)

Tool for generating schemas based on JS objects.  
Application is available on http://mterczynski.pl/joi-schema-generator

<img src="preview.png">

Example input:

```json
{
    "a": 5,
    "b": "6",
    "c": false,
    "d": {
        "a": 5,
        "b": "6",
        "c-3": false,
        "d": {}
    },
    "e": [1, 2, 3]
}
```

Example output:

```javascript
Joi.object({
    a: Joi.number().required(),
    b: Joi.string().required(),
    c: Joi.boolean().required(),
    d: Joi.object({
        a: Joi.number().required(),
        b: Joi.string().required(),
        "c-3": Joi.boolean().required(),
        d: Joi.object({}).required()
    }).required(),
    e: Joi.array().items(
        Joi.number()
    ).required()
}).required()
```

## Scripts

### npm install

Installs dependencies required to run the app and tests

### npm test

Runs the tests

### npm start

Runs the app in development mode (watch mode with hot reloading)

### npm run build

Compiles the app into a deployable /build folder
