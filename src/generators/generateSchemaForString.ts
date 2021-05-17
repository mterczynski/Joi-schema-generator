import isUUID from 'is-uuid';
import * as EmailValidator from 'email-validator';
import isIp from 'is-ip'

export function generateSchemaForString(value: string, {
    makeFieldsRequired = true,
} = {}): string {
    const required = makeFieldsRequired ? '.required()' : '';
    const uuid = isUUID.anyNonNil(value) ? '.uuid()' : '';
    const email = EmailValidator.validate(value) ? '.email()' : '';
    const ip = isIp(value) ? `.ip()` : '';

    return `Joi.string()${uuid}${email}${ip}${required}`;
}
