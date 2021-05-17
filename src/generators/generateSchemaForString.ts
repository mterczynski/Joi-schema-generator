import isUUID from 'is-uuid';
import * as EmailValidator from 'email-validator';

export function generateSchemaForString(value: string, {
    makeFieldsRequired = true,
} = {}): string {
    const required = makeFieldsRequired ? '.required()' : '';
    const uuid = isUUID.anyNonNil(value) ? '.uuid()' : '';
    const email = EmailValidator.validate(value) ? '.email()' : '';

    return `Joi.string()${uuid}${email}${required}`;
}
