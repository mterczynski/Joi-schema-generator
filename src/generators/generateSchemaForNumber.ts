export function generateSchemaForNumber({
    makeFieldsRequired = true,
} = {}) {
    if(makeFieldsRequired) {
        return `Joi.number().required()`;
    } else {
        return `Joi.number()`;
    }
}
