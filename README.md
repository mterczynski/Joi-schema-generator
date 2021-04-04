# Joi schema generator (work in progress)

Tool for generating schemas based on JS objects.

Example input:

```javascript
{
    a: 5,
    b: '6',
    c: false,
    d: {
        a: 5,
        b: '6',
        c: false,
        d: {}
    }
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
        c: Joi.boolean().required(),
        d: Joi.object({}).required(),
    }).required(),
}).required();
```

## Scripts

### npm install

Install dependencies required to run the app and tests

### npm test

Runs the tests

### npm start

Runs the app in development mode (watch mode with hot reloading)

### npm build

Compiles the app into a deployable /build folder
