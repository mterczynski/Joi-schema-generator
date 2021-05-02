export function generateSchemaForBoolean({
    makeFieldsRequired = true,
} = {}) {
    if(makeFieldsRequired) {
        return `Joi.boolean().required()`;
    } else {
        return `Joi.boolean()`;
    }
}
