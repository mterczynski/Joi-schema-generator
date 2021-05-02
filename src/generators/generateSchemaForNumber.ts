export function generateSchemaForNumber({
    makeFieldsRequired = true,
} = {}): string {
    if(makeFieldsRequired) {
        return `Joi.number().required()`;
    } else {
        return `Joi.number()`;
    }
}
