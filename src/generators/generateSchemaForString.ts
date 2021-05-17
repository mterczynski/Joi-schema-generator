import isUUID from 'is-uuid';
import * as EmailValidator from 'email-validator';
import isIp from 'is-ip';
import { isIsoDate } from '../isIsoDate';

export function generateSchemaForString(value: string, {
    makeFieldsRequired = true,
} = {}): string {
    const required = makeFieldsRequired ? '.required()' : '';
    const uuid = isUUID.anyNonNil(value) ? '.uuid()' : '';
    const email = EmailValidator.validate(value) ? '.email()' : '';
    const ip = isIp(value) ? `.ip()` : '';
    const isoDate = isIsoDate(value) ? '.isoDate()' : '';

    return `Joi.string()${uuid}${email}${ip}${isoDate}${required}`;
}
