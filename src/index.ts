export function generateSchemaFrom(data: string | [] | object) {
    if(typeof data === 'string') {
        return `Joi.string().required()`
    } else if(Array.isArray(data)) {

    } else if(typeof data === 'object') {

    }
}
