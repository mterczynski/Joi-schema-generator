export function generateSchemaForBoolean({
    makeFieldsRequired = true,
} = {}): string {
    if(makeFieldsRequired) {
        return `Joi.boolean().required()`;
    } else {
        return `Joi.boolean()`;
    }
}
