export function generateSchemaForString({
    makeFieldsRequired = true,
} = {}): string {
    if(makeFieldsRequired) {
        return `Joi.string().required()`;
    } else {
        return `Joi.string()`;
    }
}
