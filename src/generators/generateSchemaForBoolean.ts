export function generateSchemaForBoolean(value: boolean, {
    makeFieldsRequired = true,
} = {}): string {
    const required = makeFieldsRequired ? '.required()' : '';

    return `Joi.boolean()${required}`;
}
