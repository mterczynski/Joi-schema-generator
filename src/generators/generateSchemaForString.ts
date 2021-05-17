import isUUID from 'is-uuid';

export function generateSchemaForString(value: string, {
    makeFieldsRequired = true,
} = {}): string {
    const required = makeFieldsRequired ? '.required()' : '';
    const uuid = isUUID.anyNonNil(value) ? '.uuid()' : '';

    return `Joi.string()${uuid}${required}`;
}
