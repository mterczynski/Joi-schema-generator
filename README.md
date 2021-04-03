# Joi schema generator (work in progress)

Tool for generating schemas based on JS objects.

Passing this object to the generator

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

will generate

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
