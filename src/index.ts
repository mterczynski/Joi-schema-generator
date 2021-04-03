export function generateSchemaFrom(data: string | [] | object | number) {
    if(typeof data === 'string') {
        return `Joi.string().required()`
    } else if(typeof data === 'number') {
        return `Joi.number().required()`
    } else if(Array.isArray(data)) {
        return `Joi.array().required()`
    } else if(typeof data === 'object') {
        return `Joi.object({}).required()`
    }
}
