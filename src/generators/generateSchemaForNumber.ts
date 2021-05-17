export function generateSchemaForNumber(value: number, {
    makeFieldsRequired = true,
} = {}): string {
    const required = makeFieldsRequired ? '.required()' : '';

    return `Joi.number()${required}`;
}
