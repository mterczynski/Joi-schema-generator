export function generateSchemaForString({
    makeFieldsRequired = true,
} = {}) {
    if(makeFieldsRequired) {
        return `Joi.string().required()`;
    } else {
        return `Joi.string()`;
    }
}
