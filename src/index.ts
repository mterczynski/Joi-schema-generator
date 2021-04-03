export function generateSchemaFrom(data: string | [] | object) {
    if(typeof data === 'string') {
        return `Joi.string().required()`
    } else if(Array.isArray(data)) {
        return `Joi.array().required()`
    } else if(typeof data === 'object') {
        return `Joi.object({}).required()`
    }
}
